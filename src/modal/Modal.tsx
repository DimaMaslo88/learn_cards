import React from 'react';
import Modal from "@material-ui/core/Modal";
import {Box, Fade} from "@material-ui/core";
import AddModal from "./addModal/AddModal";
import {AppStateType, useAppDispatch} from "../reducers/store";
import {useSelector} from "react-redux";
import {ComponentType, setModalWindowAC} from "../reducers/modal-reducer";
import {CreateCardsTC, DeletePackTC, UpdatePackTC} from "../reducers/cards-reducer";
import {DeleteModal} from "./deleteModal/DeleteModal";
import {UpdateModal} from "./updateModal/UpdateModal";
import {AddLearningCardsModal} from "./addLearningCardsModal/AddLearningCardsModal";
import {CreateLearningCardsTC, DeleteLearningCardsTC, UpdateLearningCardsTC} from "../reducers/packCards-reducer";

import {DeleteLearningCardsModal} from "./deleteLearningCardsModa/DeleteLearningCardsModal";
import {UpdateLearningCardsModal} from "./updateLeaningCardsModal/UpdateLearningCardsModal";
import LearnCardsModal from "./learnCards/LearnCardsModal";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ModalWindow = () => {
    const dispatch = useAppDispatch()
    const isOpen = useSelector<AppStateType, boolean>(state => state.modals.isOpen)
    const nameComponent = useSelector<AppStateType, ComponentType>(state => state.modals.nameComponent)
    const status = useSelector<AppStateType, boolean>(state => state.app.status)
    const currentName = useSelector<AppStateType, string>(state => state.cardPacks.params.packName)


    const handleModalClose = () => {
        dispatch(setModalWindowAC(false, 'add', '', ''))
    };
    const addNewPack = (packName: string) => {
        dispatch(CreateCardsTC(packName))


    }
    const deletePackHandler = (id: string) => {
        dispatch(DeletePackTC(id))
    }
    const updateNamePackHandler = (id: string, name: string) => {
        dispatch(UpdatePackTC(id, name))
    }
    const addNewLearningCardHandler = (question: string, answer: string, cardsPack_id: string) => {
        dispatch(CreateLearningCardsTC(question, answer, cardsPack_id))
    }

    const deleteLearningCardsHandler = (id: string) => {
        dispatch(DeleteLearningCardsTC(id))
    }
    const updateLearningCardsHandler = (_id: string, question: string) => {
        dispatch(UpdateLearningCardsTC(_id, question))
    }
    // const learningCardsHandler=(_id:string,name:string)=>{
    //     dispatch(UpdateLearningCardsTC(_id,question))
    // }

    return (
        <div>

            <Modal

                open={isOpen}
                onClose={handleModalClose}

            >
                <Fade in={isOpen}>
                    <Box sx={style}>

                        {nameComponent === 'add' && <AddModal isLoading={status}
                                                              addNewPack={addNewPack}
                                                              packName={currentName}
                                                              closeModal={handleModalClose}
                            // updatePackName={}
                        />
                        }
                        {nameComponent === 'delete' && <DeleteModal
                            title={'Are You Sure Delete Pack ?'}
                            deletePack={deletePackHandler}
                            closeModal={handleModalClose}
                        />}
                        {nameComponent === 'update' && <UpdateModal
                            title={'Are You Want Update Your Pack?'}
                            updateNamePack={updateNamePackHandler}
                            closeModal={handleModalClose}

                        />}
                        {nameComponent === 'addCard' && <AddLearningCardsModal
                            title={'Add New Card'}
                            addNewLearningCard={addNewLearningCardHandler}
                            closeModal={handleModalClose}
                        />}
                        {nameComponent === 'deleteCard' && <DeleteLearningCardsModal
                            title={'Are you sure delete card ?'}
                            deleteLearningCards={deleteLearningCardsHandler}
                            closeModal={handleModalClose}


                        />}
                        {nameComponent === 'updateCard' && <UpdateLearningCardsModal
                            title={'Make Your Changes'}
                            updateLearningCards={updateLearningCardsHandler}
                            closeModal={handleModalClose}


                        />}
                        {nameComponent === 'learnCards' && <LearnCardsModal
                            closeModal={handleModalClose}
                        />}
                    </Box>
                </Fade>
            </Modal>

        </div>
    );
}