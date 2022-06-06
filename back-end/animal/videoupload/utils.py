
import os
import numpy as np
import cv2
import glob
import pandas as pd
import torch
import torchvision.transforms as tt
from torch.utils.data import DataLoader, Dataset
from PIL import Image

def extract_frames(video_path, saving_path, saving_name, skip_frame):
    video = cv2.VideoCapture(video_path)
    count = 0

    if not os.path.exists(saving_path):
        os.mkdir(saving_path)

    while video.isOpened():
        ret, mat = video.read()
        if ret:
            count += 1

            if count % skip_frame != 0:
                continue
            cv2.imwrite(f'{saving_path}/{saving_name}_{count}.png', mat)
        else:
            break
    video.release()

    return


# dataset reading
class MouseDataset(Dataset):
    def __init__(self, path, img_list, transform=None):
        super().__init__()
        self.path = path
        self.img_list = img_list
        self.transform = transform

    def __getitem__(self, index):
        filename = self.img_list[index]
        image = Image.open(os.path.join(self.path, filename))

        if self.transform:
            image = self.transform(image)
        return image

    def __len__(self):
        return len(self.img_list)


def get_transform():
    return tt.Compose([
        tt.Resize((224, 224)),
        tt.ToTensor(),
        tt.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])


def get_default_device():
    """Pick GPU if available, else CPU"""
    if torch.cuda.is_available():
        return torch.device('cuda')
    else:
        return torch.device('cpu')


def to_device(data, device):
    """Move tensor(s) to chosen device"""
    if isinstance(data, (list, tuple)):
        return [to_device(x, device) for x in data]
    return data.to(device, non_blocking=True)


class DeviceDataLoader():
    """Wrap a dataloader to move data to a device"""

    def __init__(self, dl, device):
        self.dl = dl
        self.device = device

    def __iter__(self):
        """Yield a batch of data after moving it to device"""
        for b in self.dl:
            yield to_device(b, self.device)

    def __len__(self):
        """Number of batches"""
        return len(self.dl)

    # manually have to define the classes names and index


# class names
classes = ['background',
           'moving forward',
           'stopped huddled',
           'rearing',
           'stopped',
           'stretched attend posture',
           'heading down and sniping',
           'snipping',
           'heading up',
           'heading up and snipping']


def predict_image(img, model, classes):
    '''classes: dict of class labels with corresponding index of training'''
    xb = to_device(img.unsqueeze(0), get_default_device())
    yb = model(xb)
    preds, score = torch.max(yb, dim=1)

    return classes[score[0].item()]