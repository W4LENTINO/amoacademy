import React from 'react';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onView, onEdit, onDelete }) => {
  return (
    <div className="flex items-center space-x-3">
      {onView && (
        <button onClick={onView} className="p-2 text-slate-300 hover:text-[#1a1a3a] transition-all" title="Visualizar">
          👁️
        </button>
      )}
      {onEdit && (
        <button onClick={onEdit} className="p-2 text-slate-300 hover:text-blue-500 transition-all" title="Editar">
          ✏️
        </button>
      )}
      {onDelete && (
        <button onClick={onDelete} className="p-2 text-slate-300 hover:text-red-500 transition-all" title="Eliminar">
          🗑️
        </button>
      )}
    </div>
  );
};