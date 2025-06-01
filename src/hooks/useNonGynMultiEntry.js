import { useState } from 'react';
import toast from 'react-hot-toast';
import { getTodayDateString } from '../utils/dateUtils';

export const useNonGynMultiEntry = (handleSubmit) => {
  const [showMultiEntryModal, setShowMultiEntryModal] = useState(false);
  const [multiEntries, setMultiEntries] = useState([]);

  const createEmptyEntry = () => ({
    accession_number: '',
    date_prepared: getTodayDateString(),
    tech_initials: '',
    std_slide_number: '',
    lb_slide_number: ''
  });

  const openMultiEntryModal = () => {
    setMultiEntries([createEmptyEntry()]);
    setShowMultiEntryModal(true);
  };

  const closeMultiEntryModal = () => {
    setShowMultiEntryModal(false);
    setMultiEntries([]);
  };

  const addEntry = () => {
    setMultiEntries(prev => [...prev, createEmptyEntry()]);
  };

  const removeEntry = (index) => {
    setMultiEntries(prev => prev.filter((_, i) => i !== index));
  };

  const updateEntry = (index, field, value) => {
    setMultiEntries(prev => prev.map((entry, i) => 
      i === index ? { ...entry, [field]: value } : entry
    ));
  };

  const submitMultiEntries = async () => {
    let hasError = false;
    
    // Create synthetic event for handleSubmit
    const syntheticEvent = { preventDefault: () => {} };

    // Submit each entry
    for (const entry of multiEntries) {
      try {
        await handleSubmit(syntheticEvent, entry);
      } catch (error) {
        console.error('Error submitting entry:', error);
        hasError = true;
        break;
      }
    }

    if (!hasError) {
      toast.success('All entries submitted successfully');
      closeMultiEntryModal();
    }
  };

  return {
    showMultiEntryModal,
    multiEntries,
    openMultiEntryModal,
    closeMultiEntryModal,
    addEntry,
    removeEntry,
    updateEntry,
    submitMultiEntries
  };
};