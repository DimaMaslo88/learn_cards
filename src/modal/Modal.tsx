import React from 'react';

import Modal from "@material-ui/core/Modal";
import {Box, Fade} from "@material-ui/core";
import AddModal from "./addModal/AddModal";
import {AppStateType, useAppDispatch} from "../reducers/store";
import {useSelector} from "react-redux";
import {ComponentType, setModalWindowAC} from "../reducers/modal-reducer";
import {addCardsAC, CreateCardsTC, DeletePackTC} from "../reducers/cards-reducer";
import {DeleteModal} from "./deleteModal/DeleteModal";
import CircularProgress from "@mui/material/CircularProgress";


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
     // const id=useSelector<AppStateType,string>(state=>state.cardPacks.params.user_id)


    const handleModalClose = () => {
        dispatch(setModalWindowAC(false, 'add', ''))
    };
    const addNewPack = (packName: string) => {
        dispatch(CreateCardsTC(packName))


    }
    const deletePackHandler = (id:string) => {
        dispatch(DeletePackTC(id))
    }
    // const deletePackHandler = (id: string) => {
    //     dispatch(DeletePackTC(id))
    //
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
                            title={'Delete Pack'}
                            deletePack={deletePackHandler}
                            closeModal={handleModalClose}


                        />}
                    </Box>
                </Fade>
            </Modal>

        </div>
    );
}