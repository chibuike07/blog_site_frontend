import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Input from "../../Common/Input.component/Input";
import TextArea from "../../Common/Textarea/TextArea";
import PostEventsFormStyle from "../../Styles/Dashboard/PostEventForm.module.css";
import Axios from "axios";
import {
  errorToastify,
  successToastify,
  infoToastify,
} from ".././react_toastify/toastify";
// import { CrisptvAdminContext } from "../../Context_files/CrisptvAdminContext";
// import { CrisptvUserContext } from "../../Context_files/CrisptvUserContext";
import Button from "../../Common/Button.component/Button";
import { AdminContext } from "../../Context_files/AdminContext";
import { UserContext } from "../../Context_files/UserContext";

const AddEventsForm = ({ postUrl, updateUrl }) => {
  //destructuring styles
  const {
    section,
    form,
    input,
    textarea,
    btngroup,
    button,
  } = PostEventsFormStyle;

  //destructuring upcoming event from context
  const [
    { specifiedCoveredEvent, coveredEvents, coveredEventTableRowIndex },
    setState,
  ] = useContext(AdminContext);
  const [
    { specifiedUserCoveredEvent, crispUserEvents, userEventIndex },
    setUserState,
  ] = useContext(UserContext);

  //destructuring states

  const [categories, setCategories] = useState("");

  const [title, setTitle] = useState("");

  const [details, setDetails] = useState("");

  const [fileValue, setfileValue] = useState(null);

  const [formattedValue, setformattedValue] = useState(null);

  //getting formatted and file raw value
  const mediaChange = ({ target }) => {
    setformattedValue(target.files[0]);
    setfileValue(target.value);
  };

  //posting event to the server
  const SubmitFunction = async () => {
    console.time("object");
    //creating a formdata to send the client events data to the server
    const FormDatas = new FormData();

    //adding the form values to the form data constructor
    FormDatas.append("title", title);
    FormDatas.append("categories", categories);
    FormDatas.append("details", details);
    FormDatas.append("media", formattedValue);

    //sending data to the server
    await Axios.post(postUrl, FormDatas, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then(async (res) => {
        //alerting a success message to the client
        successToastify(res.data.message);

        //adding the current covered event to the state
        setState((data) => ({
          ...data,
          coveredEvents: [...coveredEvents, res.data.coveredEvent],
        }));
      })
      .catch(
        (err) =>
          err.response === undefined //return false if error is undefined
            ? false
            : errorToastify(err.response.data.message) // send an error message if error is undefined
      );
    console.timeEnd("object");
  };

  //handling updating of the evnets
  const handleSubmitEditedData = async () => {
    let eventWrapper;

    specifiedCoveredEvent
      ? (eventWrapper = specifiedCoveredEvent)
      : (eventWrapper = specifiedUserCoveredEvent);

    //looping throug the targeted event and replacing the initial value with the edited field value
    Array.isArray([eventWrapper])
      ? [eventWrapper].map(async (value) => {
          value.title = title ? title : value.title;
          value.categories = categories ? categories : value.categories;
          value.details = details ? details : value.details;
          //send request to the server
          try {
            //send the updated data to the server
            await Axios.put(`${updateUrl}/${value._id}`, value, {
              "Content-Type": "application/json",
              withCredentials: true,
            }).then(async (res) => {
              successToastify(res.data.message);
              setCategories("");
              setTitle("");
              setDetails("");

              //replace the table data with the updated value at the same row
              specifiedCoveredEvent
                ? await coveredEvents.splice(
                    coveredEventTableRowIndex,
                    1,
                    res.data.updatedEvents
                  )
                : await crispUserEvents.spice(
                    userEventIndex,
                    1,
                    res.data.updatedUserEvent
                  );

              //updating the table data with the updated data
              await setState((data) => ({
                ...data,
                coveredEvents: coveredEvents,
              }));

              await setUserState((data) => ({
                ...data,
                crispUserEvents: crispUserEvents,
              }));
            });
          } catch (error) {
            //returning false if error is undefined and sending an error message to the admin
            return error.response === undefined
              ? false
              : errorToastify(error.response.data.message);
          }
        })
      : infoToastify("You are yet to select the event you wish to update");
  };

  useEffect(() => {
    //function to load the target event ready for edit to the form fields
    const handleEditRequest = () => {
      //checking if there has been a specified event for update for the user or the admin
      if (specifiedCoveredEvent || specifiedUserCoveredEvent) {
        //destructuring some event data from the specified  events of the user or the admin
        const { title, categories, details } =
          specifiedCoveredEvent || specifiedUserCoveredEvent;

        //update the form fields with the event data
        setCategories(categories);
        setTitle(title);
        setDetails(details);
      }
    };
    handleEditRequest();

    return [handleEditRequest];
  }, [specifiedCoveredEvent, specifiedUserCoveredEvent]);

  return (
    <section className={section}>
      <form onSubmit={SubmitFunction} className={form}>
        <Input
          type="text"
          placeholder="category"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          name="categories"
          className={input}
        />

        <Input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={input}
        />

        <Input
          type="file"
          onChange={mediaChange}
          name="media"
          accept="video/mp4"
          value={fileValue}
          className={input}
          style={{ border: "2px solid red" }}
          title={"file"}
        />

        <TextArea
          name="details"
          placeholder="details"
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          className={(input, textarea)}
        />
      </form>

      <div className={btngroup}>
        <Button
          text="post event"
          type="submit"
          className={button}
          backgroundColor="#000"
          click={SubmitFunction}
        />

        <Button
          text="update event"
          type="submit"
          className={button}
          backgroundColor="#000"
          click={handleSubmitEditedData}
        />
      </div>
    </section>
  );
};

export default withRouter(AddEventsForm);
