import React from "react";

export const Entry = ({ entry, mood, entry_tags, onEditButtonClick, onDeleteButtonClick }) => {
  const getMessageType = () => {
    if (mood) {
      switch (mood.label) {
        case 'Angry':
          return 'is-danger'
        case 'Happy':
          return 'is-success'
        case 'Ok':
          return 'is-warning'
        case 'Sad':
          return 'is-warning'
        default:
          break;
      }
    }
  }

  return (
    <article className={`message ${getMessageType()}`} style={{width:"100%"}}>
      <div className="message-body">
        <p className="entry__concept">{entry.concept}</p>
        <p className="entry__entry">{entry.entry}</p>
        <p className="entry__date">{entry.date}</p>
        <p className="entry__mood">{mood?.label}</p>
        {
          entry_tags.length > 0
          ? entry.tags.map(tagId => {
            //debugger
            let found_tag = entry_tags.find(t => t.id === tagId)
            if(found_tag) {
              return <p key={`entryTags${entry.id}${found_tag.label}`} className="entry_tag">{found_tag.label}</p>
            } else {
              return <div key={`entryTags${entry.id}`}></div>
            }
          })
          : null
        }
        <div className="buttons">
          <button className={`button ${getMessageType()} is-outlined`} onClick={
            () => {
              onEditButtonClick(entry.id)
            }
          }>Edit</button>
          <button className={`button ${getMessageType()}`} onClick={
            () => {
              onDeleteButtonClick(entry.id)
            }
          }>Delete</button>
        </div>
      </div>
    </article>
  )
};
