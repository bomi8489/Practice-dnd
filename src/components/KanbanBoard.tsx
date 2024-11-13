'use client'

import { ItemTypes } from '@/types/kanban'
import { useState } from 'react'
import DragDrop from './DragDrop'

export default function KanbanBoard() {
  const [items, setItems] = useState<ItemTypes>({
    'todo': [
      {
        id: '0',
        content: 'item 0',
        status: 'todo',
      },
      {
        id: '1',
        content: 'item 1',
        status: 'todo',
      },
      {
        id: '2',
        content: 'item 2',
        status: 'todo',
      },
      {
        id: '3',
        content: 'item 3',
        status: 'todo',
      },
    ],
    'doing': [],
    'done': [],
  })

  return (
    <div className='flex h-screen p-4'>
      <DragDrop
        items={items}
        setItems={setItems}
      />
    </div>
  )
}
