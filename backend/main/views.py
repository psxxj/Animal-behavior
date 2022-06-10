from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .utils import *
import os
from .serializers import DocumentSerializer
from .models import Document
from django.conf import settings
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import mimetypes
from django.http import FileResponse
from django.http.response import HttpResponse

class MainRegister(APIView):
    def get(self, request):
        documents = Document.objects.all()

        serializer = DocumentSerializer(documents, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DocumentSerializer(
            data=request.data)
        if serializer.is_valid():
            serializer.save()
            predict(request, serializer.data['id'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def predict(request, id):
    file = Document.objects.get(id=id)
    key = file.pk
    mouse_name = file.mouse_name
    if not mouse_name:
        mouse_name = str(file.uploadedFile).split('.')[0]
    # Read input video file
    video_file_path = os.path.join(settings.MEDIA_ROOT, str(file.uploadedFile))

    # Temporary frame extraction path
    temp_dir = os.path.join(f'{settings.MEDIA_ROOT}/Converted Files', str(id))
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)

    # Ai model location
    ai_model = os.path.join(settings.MEDIA_ROOT, 'ai_model/mciebehaviourseq_model.pth')


    extract_frames(video_path=video_file_path,
                         saving_path=temp_dir, saving_name=mouse_name,
                         skip_frame=5)

    frame_lists = os.listdir(temp_dir)
    sorted_frame_list = sorted([np.uint(x.split("_")[-1].split('.png')[0]) for x in frame_lists])

    images_list = []
    for file in sorted_frame_list:
        images_list.append(f'{mouse_name}_{file}.png')


    # space efor frame sorting

    #dataset reading
    test_dataset = MouseDataset(path=temp_dir,
                                img_list=images_list,
                                transform=get_transform())

    # loading the model
    model = torch.load(ai_model, map_location=torch.device('cpu'))


    for cls in classes:
        class_to_int = {classes[i]: i for i in range(len(classes))}

    prediction = []
    for i in range(len(test_dataset)):
        img = test_dataset[i]
        prediction.append(predict_image(img, model, classes))
        x = format(i/len(test_dataset), '.2f')
        print(x)
        # x 가 진행정도

    result = pd.DataFrame(prediction, columns=['animal_behavior'])

    csv_path = os.path.join(settings.MEDIA_ROOT, 'Predicted Files')
    if not os.path.exists(csv_path):
        os.makedirs(csv_path)
    csv_path2 = f'{csv_path}/{request.user.username}_{mouse_name}_behaviour_sequence.xlsx'
    # saving cvs file
    result.to_excel(csv_path2)
    return visualization(request, key)

def visualization(request, id):
    # file path = csv file path
    frame_rate = 5
    file = Document.objects.get(id=id)
    key = file.pk
    mouse_name = file.mouse_name
    file_path = f'{settings.MEDIA_ROOT}/Predicted Files/{request.user.username}_{mouse_name}_behaviour_sequence.xlsx'
    excel_file = pd.read_excel(file_path)
    #frame_labels = excel_file['labels']
    frame_labels = excel_file['animal_behavior']
    #frames_num = pd.DataFrame([(i + 1) * frame_rate for i in len(range(frame_labels))])
    # frequency of predicted labels

    pie_labels = frame_labels.unique()
    predicted_lab_freq_dict = {i: len(frame_labels[frame_labels == i]) for i in pie_labels}
    predicted_lab_freq = list(predicted_lab_freq_dict.values())
    s = np.sum(predicted_lab_freq)
    relative_freq_dict = [format(((i * 100) / s), '.2f') for i in predicted_lab_freq_dict.values()]
    relative_freq_array = np.array(relative_freq_dict)

    plt.figure()
    plt.rcParams.update({'font.size': 8})
    plt.subplot()
    plt.title("Relative frequency distribution of animal behavior")
    plt.pie(relative_freq_array, labels=pie_labels)
    plot_path = os.path.join(settings.MEDIA_ROOT, 'Visual Files')
    if not os.path.exists(plot_path):
        os.makedirs(plot_path)
    plot_path1 = f'{plot_path}/{request.user.username}_{mouse_name}_pie_plot.png'
    plt.savefig(plot_path1)

    # bar plot
    plt.figure()
    plt.subplot()
    sns.histplot(frame_labels, color='red', pmax=np.max(predicted_lab_freq))
    plt.xticks(rotation=5)
    plt.xlabel("Behavior")
    plt.ylabel("Frequency of behavior")
    plt.title("Frequency of behavior sequence")
    plot_path2 = os.path.join(plot_path, f'{request.user.username}_{mouse_name}_hist_plot.png')
    plt.savefig(plot_path2)

    plt.figure()
    plt.subplot()
    # creating sequence for all class
    all_binary_sequence = [np.uint8(frame_labels == i) for i in classes]
    for i in range(len(all_binary_sequence)):
        seq = [k*(i+1) if k != 0 else k+i for k in all_binary_sequence[i]]
        plt.fill(seq, label=classes[i])
    plt.xlabel("Frame")
    plt.ylabel("Behavior")
    plt.title("Behavior Sequence vs Frame")
    plt.legend()
    plot_path3 = os.path.join(plot_path, f'{request.user.username}_{mouse_name}_sequence_plot.png')
    plt.savefig(plot_path3)

    plt.figure()
    plt.subplot()
    for i in range(len(all_binary_sequence)):
        seq = [k * (i + 1) if k != 0 else k + i for k in all_binary_sequence[i]]
        plt.plot(seq, label=classes[i])
    plt.xlabel("Frame")
    plt.ylabel("Behavior")
    plt.title("Behavior Sequence vs Frame")
    plt.legend()
    plot_path4 = os.path.join(plot_path, f'{request.user.username}_{mouse_name}_sequence_plot2.png')
    plt.savefig(plot_path4)


def download(request):
    file = Document.objects.get(id=len(Document.objects.all())-1)
    file_path = os.path.join(settings.MEDIA_ROOT, f'Predicted Files/{request.user.username}_{file.mouse_name}_behaviour_sequence.xlsx')
    path = FileResponse(open(file_path, 'rb'))
    mime_type, _ = mimetypes.guess_type(file_path)
    response = HttpResponse(path, mime_type)
    response['Content-Disposition'] = f'attachment;filename={file.mouse_name}.xlsx'
    return response

