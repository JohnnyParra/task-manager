// Libraries
import React, {startTransition, useState} from 'react'

// styling
import './CreateTask.css'

export default function CreateTask(props){

  const {groupData, input, handleInputChange, addTask, btnRef/*, 
    dropdown*/, dropdownActive, dropdownEnter, dropdownFilter, dropdownSearch/*, dropdownSelected*/} = props;

  const [selected, setSelected] = useState('');
  const [active, setActive] = useState(false)
  function dropdownSelected(event) {
    setSelected(event.target.id)
    setActive(false)
  }

  function dropdown() {
    setActive(prevActive => !prevActive)
  }

  const classList = active ? "dropdown-content show" : "dropdown-content";
  
  // displays elements in dropdown
  const groupListElements = groupData.map(group => {
    if(group.group_id != 0 && group.group_id != 1) {
      if(dropdownSearch == "") {
        return <p key = {group.group_id} id = {group.group_id} className = "create-dropdown-group" onClick={(event) => dropdownSelected(event)}>{group.title}</p>
      } 
      else if (group.title.toUpperCase().indexOf(dropdownSearch.toUpperCase()) === 0 && group.title != "Group") {
        return <p key = {group.group_id} id = {group.group_id} className = "create-task-dropdown-group" onClick={(event) => dropdownSelected(event)}>{group.title}</p>
      }
    }
  })

  // switches group name to name of current group selected
  // const groupElement = groupData.map(group => {
  //   if(group.selected == true) {return <p key = {group.group_id} className = "create-task-dropdown" ref = {btnRef}>{group.title}</p>}
  // })

  const groupElement = groupData.filter(group => selected === group.group_id).map(group => {
    return <p key = {group.group_id} className = "create-task-dropdown" ref = {btnRef}>{group.title}</p>
  })

  // console.log('props.newTaskMessage', props.newTaskMessage)

  return(
    <div className="create-task-container">

      <div className = "create-task">

        <div className="left-box">
          
          <div className = "create-task-input-container">
            <input 
              className="input create-task-input" 
              id="create-task-title-input"
              placeholder="Input task here..."
              type="text"
              name="title"
              value={input.title}
              onChange={() => handleInputChange(event)} 
            />
          </div>

          <div className = "dropdown create-task-dropdown-container" >
            <div className = "group dropbtn create-task-dropdown" onClick = {() => dropdown(event)}>
              <img className = "create-task-dropdown" src = "https://app.clockify.me/assets/ui-icons/plus-blue-req.svg" alt = "" />
              {selected == '' ? 'Group' : groupElement}
            </div>
            <div id = "group-dropdown" className = {classList} >
              <input 
                type = "text" 
                className = ""
                value = {dropdownSearch} 
                placeholder = "Search/Create..." 
                id = "create-dropdown-input"
                name = "group" 
                onChange = {() => dropdownFilter(event)} 
                onKeyDown = {() => dropdownEnter(event)}
              />
              {groupListElements}
            </div>
          </div>

        </div>
        
        <div className="right-box">
          <span className = "line-divider"></span>

          <div className = "create-task-time-container">
            <input 
              className = "time create-task-input"
              type = "time" 
              name = "startTime"
              value = {input.startTime}
              onChange = {() => handleInputChange(event)}
            />
            <div className = "time-divider">-</div>
            <input 
              className = "time create-task-input"
              type = "time"
              name = "endTime"
              value = {input.endTime}
              onChange = {() => handleInputChange(event)} 
            />
          </div>

          <span className="line-divider"></span>
          
          <div className = "create-task-date-container">
            <input 
              className = "date create-task-input" 
              type = "date" 
              name = "date"
              value = {input.date}
              onChange = {() => handleInputChange(event)} 
            />
          </div>

          <span className = "line-divider"></span>

          <div className = "create-task-add-button-container">
            <button onClick = {() => addTask()}>ADD</button>
          </div>
          <img className = "options" src = "https://app.clockify.me/assets/ui-icons/menu-dots-vertical.svg" alt = "" />
        </div>
        
      </div>
      <h4 style = {{display: props.newTaskMessage ? 'block' : 'none'}}>A new task has been created!</h4>
    </div>
  )
}

// 