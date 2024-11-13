'use client'

import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";

type ItemType = {
  id: string,
  content: string,
}

export default function App() {
  const [items, setItems] = useState<ItemType[]>([
    {
      id: '0',
      content: 'item 0',
    },
    {
      id: '1',
      content: 'item 1',
    },
    {
      id: '2',
      content: 'item 2',
    },
    {
      id: '3',
      content: 'item 3',
    },
  ])

  // Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    // 기존 데이터 깊은 복사
    const _items: ItemType[] = JSON.parse(JSON.stringify(items));
    // 복사된 데이터에서 드래그하려는 타겟 가져오기
    const [targetItems] = _items.splice(source.index, 1);
    // 목적지에 타겟 삽입
    _items.splice(destination.index, 0, targetItems);

    setItems(_items)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}