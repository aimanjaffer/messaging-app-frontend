import Contact from './Contact';
const ContactsList = (props) => {
    //console.log(props.user);
    let contactList = props.user.contacts;
    //TODO: filter out the ones where user already has an ongoing conversation
    return (
        <>
        {contactList.map((item) => <Contact key={item} 
        id={item} 
        user={props.user}
        callbackOnClickConversation={props.callbackOnClickConversation}
        reloadConversationSummary={props.reloadConversationSummary}/>)}
        </>
    );
}


export default ContactsList;