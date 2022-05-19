import React, { useEffect} from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';



const MyNotes = ({search}) => {


    const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;
  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

    
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };
const history = useHistory();
    
    console.log(notes);
    useEffect(()=>{
        
dispatch(listNotes());
if (!userInfo) {
    history.push("/");}
    },[dispatch,successCreate,history,userInfo,successUpdate,successDelete])
    const user =  JSON.parse( localStorage.getItem("userInfo"));

   


    
  return <MainScreen title={`welcome back ${userInfo.name}..`}>
         
      <Link to="createnote">
      <Button style={{marginLeft:10 ,marginBottom: 6}} size="lg">
          Create New Note
      </Button>
      </Link> 
      
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}

      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes?.reverse().filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())).map(note=>(
        
        <Accordion >
        <Card style={{ margin:10 }}>
          <Card.Header style={{display:"flex"}}>
          <span style={{
              color:"black",
              textDecoration:"none",
              flex:1,
              cursor:"pointer",
              alignSelf:"center",
              fontSize:18,
          }} >
        <Accordion.Item
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                    <Accordion.Header>{note.title}</Accordion.Header>  
                    <Accordion.Body>
          <h4>
                      <Badge variant="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Accordion.Body>

                    </Accordion.Item>
          
               
          </span>
          <div>
          <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>

          </div>
          </Card.Header>
          
          
          
          

          
          

      </Card> 
      </Accordion>



      ))
      
      
      }
     
      
  </MainScreen>;
};

export default MyNotes;
