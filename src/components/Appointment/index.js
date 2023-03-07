import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

//an Index file where all the appointment components gets called and ran accordingly
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  /* Function thats called when saved button is pressed for the interview section
     Name of Interviewee and Interviwer must be selected.
     Trasition to a saving-loading screen. and change the sate to SHOW
  */
  function save (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    
    props
      .bookInterview(props.id, interview)
      .then(() => {transition(SHOW)})
      .catch(error => {transition(ERROR_SAVE, true)});
  }
  /* Function thats called when delete button is pressed an Appointment
     Transition to DELETE, where
     Trasition to a saving-loading screen. and change the state to EMPTY
  */
  function destroy () {
    transition(DELETING, true);
    
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }
  /* Function thats called when edit button is pressed for already existing appointment
     New Name and Interviewer can be submitted
     Trasition to a saving-loading screen. and change the sate to EDIT
  */
  function edit (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    props.bookInterview(props.id, interview)
      .then(() => { transition(EDIT);});
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (<Show student={props.interview.student} 
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
      />)}
      
      {mode === CREATE && (
        <Form
          student={props.student}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          onDelete={destroy}
        />
      )}
      
      {mode === CONFIRM && (
        <Confirm 
          message="Are you sure you want to delete?"
          onConfirm={destroy}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form 
          student={props.student}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      
      {mode === SAVING && (
        <Status string={"Saving"} />
      )}

      {mode === DELETING && (
        <Status string={"Deleting"} />
      )}
      
      {mode === ERROR_SAVE && (
        <Error string={"save"} />
      )}

      {mode === ERROR_DELETE && (
        <Error string={"delete"} />
      )}
    </article>
  );
}