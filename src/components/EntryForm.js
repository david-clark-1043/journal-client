import React, { useState, useEffect } from "react"

export const EntryForm = ({ entry, moods, tags, onFormSubmit }) => {
    const [editMode, setEditMode] = useState(false)
    const [updatedEntry, setUpdatedEntry] = useState(entry)

    useEffect(() => {
        setUpdatedEntry(entry)
        if ('id' in entry) {
            setEditMode(true)
        }
        else {
            setEditMode(false)
        }
    }, [entry])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry = Object.assign({}, updatedEntry)
        if(event.target.name === "tags") {
            if(!(event.target.name in newEntry)){
                newEntry[event.target.name] = []
            }
            let val = parseInt(event.target.id)
            if(event.target.checked) {
                newEntry[event.target.name].push(val)
            } else {
                newEntry[event.target.name] = newEntry[event.target.name].filter(tag => tag !== val)
            }
        } else {
            newEntry[event.target.name] = event.target.value
        }
        setUpdatedEntry(newEntry)
    }



    const constructNewEntry = () => {
        const copyEntry = { ...updatedEntry }
        copyEntry.moodId = parseInt(copyEntry.moodId)
        if (!copyEntry.date) {
            copyEntry.date = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
        }
        onFormSubmit(copyEntry)
    }

    return (
        <article className="panel is-info">
            <h2 className="panel-heading">{editMode ? "Update Entry" : "Create Entry"}</h2>
            <div className="panel-block">
                <form style={{ width: "100%" }}>
                    <div className="field">
                        <label htmlFor="concept" className="label">Concept: </label>
                        <div className="control">
                            <input type="text" name="concept" required autoFocus className="input"
                                proptype="varchar"
                                placeholder="Concept"
                                value={updatedEntry.concept}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="entry" className="label">Entry: </label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="entry"
                                value={updatedEntry.entry}
                                onChange={handleControlledInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="moodId" className="label">Mood: </label>
                        <div className="control">
                            <div className="select">
                                <select name="moodId"
                                    proptype="int"
                                    value={updatedEntry.moodId}
                                    onChange={handleControlledInputChange}>

                                    <option value="0">Select a mood</option>
                                    {moods.map(m => (
                                        <option key={m.id} value={m.id}>
                                            {m.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="entryTags" className="label">Entry Tags: </label>
                        <div className="control">
                                {
                                    tags.map( tag => {
                                        // logic to determine whether box should be pre-checked
                                        let checked_status = false
                                        if("tags" in updatedEntry) {
                                            if(updatedEntry.tags.length > 0) {
                                                let found_tag = updatedEntry.tags.find(t => t === tag.id)
                                                if(found_tag){
                                                    checked_status = true
                                                } else {
                                                    checked_status = false
                                                }
                                            } else {
                                                checked_status = false
                                            }
                                        }
                                        return <div key={`formTags-${tag.id}`} className="checkbox">
                                                    <input name="tags"
                                                    type="checkbox" 
                                                    htmlFor="entryTags" 
                                                    id={tag.id} 
                                                    onChange={handleControlledInputChange} 
                                                    checked={checked_status}
                                                     />
                                                    <label htmlFor={tag.id}>{tag.label}</label>
                                                </div>
                                        })
                                }
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()
                                    constructNewEntry()
                                }}
                                className="button is-link">
                                {editMode ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </article>
    )
}
