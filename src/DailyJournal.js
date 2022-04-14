import React, { useState, useEffect } from "react";
import { EntryForm } from "./components/EntryForm";
import { EntryList } from "./components/EntryList";
import { addEntry, deleteEntry, getEntries, getEntryById, updateEntry } from "./components/EntryManager";
import { getMoods } from "./components/mood/MoodManager";
import { getTags } from "./components/tag/TagManager";

export const DailyJournal = () => {
  const [entries, setEntries] = useState([])
  const [moods, setMoods] = useState([])
  const [entry, setEntry] = useState({})
  const [entry_tags, setentry_tags] = useState([])

  useEffect(() => {
    getAllEntries()
    .then(() => getMoods())
    .then(moodsData => setMoods(moodsData))
    // .then(() => getentry_tags())
    // .then(entry_tagsData => {
    //   debugger
    //   setentry_tags(entry_tagsData)
    // })
  }, [])

  useEffect(() => {
    getTags()
    .then(entry_tagsData => {
      //debugger
      setentry_tags(entry_tagsData)
    })
  }, [moods])

  useEffect(() => {
    console.log(entry_tags)
  }, [entry_tags])

  const getAllEntries = () => {
    return getEntries().then(entriesData => setEntries(entriesData))
  }

  const onEditButtonClick = (entryId) => {
    getEntryById(entryId).then(entryData => setEntry(entryData)).then(() => console.log(entry))
  }

  const onDeleteButtonClick = (entryId) => {
    deleteEntry(entryId)
      .then(getAllEntries)
  }

  const onFormSubmit = (entryData) => {
    console.log("submit", entryData)
    if (entryData.id) {
      updateEntry(entryData).then(getAllEntries)
    } else {
      addEntry(entryData).then(getAllEntries)
    }
    setEntry({
      concept: "",
      entry: "",
      moodId: 0
    })
  }

  return (
    <div className="DailyJournal container">
      <div className="columns">
        <div className="column">
          <EntryForm entry={entry} moods={moods} entry_tags={entry_tags} onFormSubmit={onFormSubmit} />
        </div>
        <div className="column">
          <EntryList
            entries={entries}
            moods={moods}
            entry_tags={entry_tags}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        </div>
      </div>

    </div>
  );
};
