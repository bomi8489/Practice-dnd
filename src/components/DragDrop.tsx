import React, { Dispatch, SetStateAction } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { ItemStatus, ItemTypes } from '@/types/kanban';
import { cn } from '@/utils/cn';

interface DragDropProps {
  items: ItemTypes,
  setItems: Dispatch<SetStateAction<ItemTypes>>
}

export default function DragDrop(props: DragDropProps) {
  const {items, setItems} = props;
  
  const onDragEnd = ({ source, destination }: DropResult) => {
     if (!destination) return;

    const scourceKey = source.droppableId as ItemStatus;
    const destinationKey = destination.droppableId as ItemStatus;

    const _items: ItemTypes = JSON.parse(JSON.stringify(items));
    const [targetItem] = _items[scourceKey].splice(source.index, 1);
    targetItem.status = destinationKey;
    _items[destinationKey].splice(destination.index, 0, targetItem);
    setItems(_items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='grid flex-1 select-none grid-cols-3 gap-4 rounded-lg justify-center'>
        {Object.keys(items).map(key => 
          <div key={key} className={cn('flex flex-col ring-1 ring-slate-300 gap-3 rounded-xl p-4 max-h-[500px]')}>
            <span className="text-md font-semibold flex items-center justify-center">{key.toLocaleUpperCase()}</span>
            <Droppable key={key} droppableId={key}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className='flex-col h-full'>
                  {items[key as ItemStatus].map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={cn('rounded-lg p-4 transition-shadow')}
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
          </div>
        )}
      </div>
    </DragDropContext>
  );
}
