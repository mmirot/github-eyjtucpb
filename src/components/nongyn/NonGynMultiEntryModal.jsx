import React from 'react';
import PropTypes from 'prop-types';
import { getTodayDateString } from '../../utils/dateUtils';

const NonGynMultiEntryModal = ({ 
  isOpen,
  entries,
  onEntryChange,
  onAddEntry,
  onRemoveEntry,
  onSubmit,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" />
      <div className="stain-modal">
        <h2 className="text-xl font-bold mb-4">Multiple Case Entry</h2>
        
        <div className="overflow-x-auto max-h-[60vh]">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="px-2 py-1">Accession #</th>
                <th className="px-2 py-1">Date Prepared</th>
                <th className="px-2 py-1">Tech</th>
                <th className="px-2 py-1">Std #</th>
                <th className="px-2 py-1">LB #</th>
                <th className="px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td className="p-1">
                    <input
                      type="text"
                      value={entry.accession_number}
                      onChange={(e) => onEntryChange(index, 'accession_number', e.target.value)}
                      className="w-[150px] border rounded p-1 text-center"
                      placeholder="Enter number"
                    />
                  </td>
                  <td className="p-1">
                    <input
                      type="date"
                      value={entry.date_prepared}
                      onChange={(e) => onEntryChange(index, 'date_prepared', e.target.value)}
                      max={getTodayDateString()}
                      className="w-[130px] border rounded p-1"
                    />
                  </td>
                  <td className="p-1">
                    <input
                      type="text"
                      value={entry.tech_initials}
                      onChange={(e) => onEntryChange(index, 'tech_initials', e.target.value)}
                      maxLength={3}
                      className="w-[60px] border rounded p-1 text-center"
                    />
                  </td>
                  <td className="p-1">
                    <input
                      type="number"
                      value={entry.std_slide_number}
                      onChange={(e) => onEntryChange(index, 'std_slide_number', e.target.value)}
                      min="0"
                      className="w-[60px] border rounded p-1 text-center"
                    />
                  </td>
                  <td className="p-1">
                    <input
                      type="number"
                      value={entry.lb_slide_number}
                      onChange={(e) => onEntryChange(index, 'lb_slide_number', e.target.value)}
                      min="0"
                      className="w-[60px] border rounded p-1 text-center"
                    />
                  </td>
                  <td className="p-1">
                    <button
                      type="button"
                      onClick={() => onRemoveEntry(index)}
                      className="text-red-600 hover:text-red-800 px-2"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button
            type="button"
            onClick={onAddEntry}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Row
          </button>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="submit-button"
            >
              Submit All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

NonGynMultiEntryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({
    accession_number: PropTypes.string.isRequired,
    date_prepared: PropTypes.string.isRequired,
    tech_initials: PropTypes.string.isRequired,
    std_slide_number: PropTypes.string.isRequired,
    lb_slide_number: PropTypes.string.isRequired
  })).isRequired,
  onEntryChange: PropTypes.func.isRequired,
  onAddEntry: PropTypes.func.isRequired,
  onRemoveEntry: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default NonGynMultiEntryModal;