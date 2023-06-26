const Draggable = ({
  dragStartHandler = () => {},
  dragEndHandler = () => {},
  dropHandler = () => {},
  children,
  dragEnterHandler = () => {},
}) => (
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
