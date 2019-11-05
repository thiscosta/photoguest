import React from 'react'

import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    ModalContainer, ModalHeader, ModalTitle, ModalContent,
    ContentText, ModalButtonsContainer, ModalButton
} from './styles'

const CustomModal = ({
    isVisible, onBackdropPress, modalBackground,
    iconName, iconColor, modalTitle, modalTitleColor,
    content, closeText, closeAction, confirmText, confirmAction
}) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={() => {
            onBackdropPress()
        }}>
            <ModalContainer background={modalBackground}>
                <ModalHeader>
                    <Icon name={iconName} size={27} color={iconColor} />
                    <ModalTitle color={modalTitleColor}>{modalTitle}</ModalTitle>
                </ModalHeader>
                <ModalContent>
                    <ContentText>
                        {content}
                    </ContentText>
                </ModalContent>
                <ModalButtonsContainer>
                    <ModalButton onPress={() => {
                        closeAction()
                    }}>{closeText}</ModalButton>
                    <ModalButton onPress={() => {
                        confirmAction()
                    }}>{confirmText}</ModalButton>
                </ModalButtonsContainer>
            </ModalContainer>
        </Modal>
    )
}

export default CustomModal