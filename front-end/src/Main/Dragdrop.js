import React, {useState, useCallback, useEffect, ChangeEvent, useRef} from 'react';
import './Dragdrop.css';

  const DragDrop = () => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileId = useRef<number>(0);
    const dragRef = useRef<HTMLLabelElement | null>(null);
    
    return (
      <div className="DragDrop">
        <input type="file" id="fileUpload" style={{ display: "none" }}/>
  
        <label className={isDragging ? "DragDrop-File-Dragging" : "DragDrop-File"}
          htmlFor="fileUpload" ref={dragRef}>
          <div>파일 첨부</div>
        </label>
      </div>
    );
  }