import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const Contact = (props) => {
    //console.log(props);
    const [contactName, setContactName] = useState('');
    const [lastSeenTime, setLastSeenTime] = useState('');
    useEffect(()=>{
        fetch(`http://localhost:3001/users/${props.id}`)
                .then((response) => response.json())
                .then(response => {
                    setContactName(response.FullName);
                    setLastSeenTime(response.lastSeenTime);
                });
    },[props.id]);
    const createConversation = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                participant: [props.id, props.user._id]
              })
          };
          fetch(`http://localhost:3001/conversation`, requestOptions)
                .then((response) => response.json())
                .then(response => response.insertedId)
                .then(response => {
                    props.callbackOnClickConversation(response, contactName, lastSeenTime);
                    props.reloadConversationSummary();
                });
    }
    return (
    <Card style={{cursor: 'pointer'}} bg="light" text="dark" onClick={createConversation}>
        <Card.Title>{contactName}</Card.Title>
    </Card>
    );
}


export default Contact;