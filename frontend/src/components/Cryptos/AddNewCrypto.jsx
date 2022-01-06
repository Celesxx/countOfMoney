import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import API from '../../api'
const AddNewSource = () => {

    const history = useHistory();

    const [show, setShow] = useState(false);
    const [cryptoName, setcryptoName] = useState('');
    const [gecko, setGecko] = useState('');
    const [image, setImage] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveChanges = async(e) => {
        e.preventDefault()
        const payload = {
            name: cryptoName,
            gecko: gecko,
            image: image
        }
        const response = await API.addCrypto(payload)
        console.log(response)
        handleClose()
        history.go(0)
    }

    return (
        <div>
            <Button variant="success" size={"sm"} onClick={handleShow}> + Add</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Cryptocurrency</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2" controlId="formBasicName">
                            <FloatingLabel label={"Name"}>
                                <Form.Control type="text" placeholder="Name for the display" onChange={(e) => setcryptoName(e.target.value)}/>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicGecko">
                            <FloatingLabel label={"Gecko ID"}>
                                <Form.Control type="text" placeholder="The coinGecko ID" onChange={(e) => setGecko(e.target.value)}/>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicImage">
                            <FloatingLabel label={"Image link"}>
                                <Form.Control type="text" placeholder="Link to the image" onChange={(e) => setImage(e.target.value)}/>
                            </FloatingLabel>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddNewSource;
