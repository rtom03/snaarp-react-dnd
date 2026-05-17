SNAARP DRAG AND DROP

User drags a card
↓
PointerSensor detects movement > 5px → drag activates
↓
@dnd-kit tracks position, animates other cards via SortableContext
↓
User releases → onDragEnd fires { active.id, over.id }
↓
handleDragEnd calls reorderCards(activeId, overId)
↓
Zustand splices the cards array into new order
↓
React re-renders the grid in the new order
