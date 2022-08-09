import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Box, Fade } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  selectIsOpen,
  selectNameComponent,
  selectStatus,
} from 'modal/selectors/SelectorsModal';
import {
  CreateLearningCardsTC,
  DeleteLearningCardsTC,
  UpdateLearningCardsTC,
} from 'reducers/packCards-reducer';
import { useAppDispatch } from 'reducers/store';
import { setModalWindowAC } from 'reducers/modal-reducer';
import { CreateCardsTC, DeletePackTC, UpdatePackTC } from 'reducers/cards-reducer';
import { selectPackName } from 'reducers/selectors/Selectors';
import AddModal from './addModal/AddModal';
import { DeleteModal } from './deleteModal/DeleteModal';
import { UpdateModal } from './updateModal/UpdateModal';
import { AddLearningCardsModal } from './addLearningCardsModal/AddLearningCardsModal';

import {
  DeleteLearningCardsModal,
} from './deleteLearningCardsModa/DeleteLearningCardsModal';
import {
  UpdateLearningCardsModal,
} from './updateLeaningCardsModal/UpdateLearningCardsModal';
import LearnCardsModal from './learnCards/LearnCardsModal';

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

export function ModalWindow():React.ReactElement {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(selectIsOpen);
  const nameComponent = useSelector(selectNameComponent);
  const status = useSelector(selectStatus);
  const currentName = useSelector(selectPackName);

  const handleModalClose = ():void => {
    dispatch(setModalWindowAC(false, 'add', '', ''));
  };
  const addNewPack = (packName: string):void => {
    dispatch(CreateCardsTC(packName));
  };
  const deletePackHandler = (id: string):void => {
    dispatch(DeletePackTC(id));
  };
  const updateNamePackHandler = (id: string, name: string):void => {
    dispatch(UpdatePackTC(id, name));
  };
  const addNewLearningCardHandler = (question: string, answer: string, cardsPackId: string):void => {
    dispatch(CreateLearningCardsTC(question, answer, cardsPackId));
  };

  const deleteLearningCardsHandler = (id: string):void => {
    dispatch(DeleteLearningCardsTC(id));
  };
  const updateLearningCardsHandler = (_id: string, question: string):void => {
    dispatch(UpdateLearningCardsTC(_id, question));
  };


  return (
    <div>

      <Modal
        open={isOpen}
        onClose={handleModalClose}
      >
        <Fade in={isOpen}>
          <Box sx={style}>

            {nameComponent === 'add' && (
            <AddModal
              isLoading={status}
              addNewPack={addNewPack}
              packName={currentName}
              closeModal={handleModalClose}
            />
            )}
            {nameComponent === 'delete' && (
            <DeleteModal
              title="Are You Sure Delete Pack ?"
              deletePack={deletePackHandler}
              closeModal={handleModalClose}
            />
            )}
            {nameComponent === 'update' && (
            <UpdateModal
              title="Are You Want Update Your Pack?"
              updateNamePack={updateNamePackHandler}
              closeModal={handleModalClose}
            />
            )}
            {nameComponent === 'addCard' && (
            <AddLearningCardsModal
              title="Add New Card"
              addNewLearningCard={addNewLearningCardHandler}
              closeModal={handleModalClose}
            />
            )}
            {nameComponent === 'deleteCard' && (
            <DeleteLearningCardsModal
              title="Are you sure delete card ?"
              deleteLearningCards={deleteLearningCardsHandler}
              closeModal={handleModalClose}
            />
            )}
            {nameComponent === 'updateCard' && (
            <UpdateLearningCardsModal
              title="Make Your Changes"
              updateLearningCards={updateLearningCardsHandler}
              closeModal={handleModalClose}
            />
            )}
            {nameComponent === 'learnCards' && (
            <LearnCardsModal
              closeModal={handleModalClose}
            />
            )}
          </Box>
        </Fade>
      </Modal>

    </div>
  );
}
