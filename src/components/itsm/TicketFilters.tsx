import React from 'react';
import { Filter } from 'lucide-react';

interface TicketFiltersProps {
  statusFilter: string;
  priorityFilter: string;
  categoryFilter: string;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  onCategoryChange: (category: string) => void;
}

const TicketFilters: React.FC<TicketFiltersProps> = ({
  statusFilter,
  priorityFilter,
  categoryFilter,
  onStatusChange,
  onPriorityChange,
  onCategoryChange
}) => {
  const statuses = ['All', 'Open', 'In Progress', 'Pending', 'Resolved', 'Closed'];
  const priorities = ['All', 'Critical', 'High', 'Medium', 'Low'];
  const categories = ['All', 'Réseau', 'Matériel', 'Infrastructure', 'Sécurité', 'Applications'];

  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filtres:</span>
      </div>
      
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
      >
        {statuses.map(status => (
          <option key={status} value={status}>
            {status === 'All' ? 'Tous les statuts' : status}
          </option>
        ))}
      </select>
      
      <select
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
      >
        {priorities.map(priority => (
          <option key={priority} value={priority}>
            {priority === 'All' ? 'Toutes les priorités' : priority}
          </option>
        ))}
      </select>
      
      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category === 'All' ? 'Toutes les catégories' : category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TicketFilters;