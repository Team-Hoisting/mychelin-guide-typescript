interface DraggableProps {
  dragStartHandler: () => void;
  dragEndHandler: () => void;
  dropHandler: () => void;
  dragEnterHandler: () => void;
  children: JSX.Element;
}

const Draggable = ({ dragStartHandler, dragEndHandler, dropHandler, children, dragEnterHandler }: DraggableProps) => (
  <div
    draggable="true"
    onDragEnter={dragEnterHandler}
    onDragStart={dragStartHandler}
    onDragOver={e => e.preventDefault()}
    onDragEnd={dragEndHandler}
    onDrop={dropHandler}>
    {children}
  </div>
);

export default Draggable;
