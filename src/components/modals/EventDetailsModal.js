// src/components/modals/EventDetailsModal.js
import React from "react";
import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  Div,
} from "@vkontakte/vkui";
import { Icon24Dismiss, Icon28CancelOutline } from "@vkontakte/icons";
import { platform } from "@vkontakte/vkui";

const EventDetailsModal = ({ activeEvent, onClose }) => {
  const currentPlatform = platform();

  return (
    activeEvent && (
      <ModalPage
        id="eventDetails"
        onClose={onClose}
        header={
          <ModalPageHeader
            left={
              currentPlatform === "android" && (
                <PanelHeaderButton onClick={onClose}>
                  <Icon24Dismiss />
                </PanelHeaderButton>
              )
            }
            right={
              currentPlatform === "ios" && (
                <PanelHeaderButton onClick={onClose}>
                  <Icon28CancelOutline />
                </PanelHeaderButton>
              )
            }
          >
            <h3 style={{ fontSize: "23px", fontStyle: "italic", margin: 0 }}>
              {activeEvent.title}
            </h3>
          </ModalPageHeader>
        }
        style={{ zIndex: 1001, height: "80vh", overflowY: "auto", top: "10vh" }}
      >
        <Div>
          <img
            src={activeEvent.image}
            alt={activeEvent.title}
            style={{
              width: "100%",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
          <h4>Общая информация:</h4>
          <p>{activeEvent.description}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h4 style={{ margin: 0, marginRight: "8px" }}>Дата:</h4>
            <p style={{ margin: 0 }}>{activeEvent.date}</p>
          </div>
        </Div>
      </ModalPage>
    )
  );
};

export default EventDetailsModal;
