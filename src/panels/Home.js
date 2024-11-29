import {
  Panel,
  PanelHeader,
  Tabs,
  TabsItem,
  Group,
  Header,
  Card,
  SimpleCell,
  Avatar,
  Div,
  Checkbox,
  Button,
  platform,
} from "@vkontakte/vkui";
import { useState, useEffect } from "react";
import {
  Icon28FavoriteOutline,
  Icon28Favorite,
  Icon24Filter,
} from "@vkontakte/icons";

import events from "./eventsData"; // Импортируем события из файла events.js

// Компонент "О сервисе"
const ServiceInfo = () => (
  <Div
    style={{
      display: "flex",
      alignItems: "center",
      padding: "40px",
      backgroundColor: "#E0F7FA", // Светлый голубой фон
    }}
  >
    <Icon28FavoriteOutline
      style={{
        color: "#00B0FF",
        backgroundColor: "#B3E5FC",
        borderRadius: "50%",
      }}
      width={32}
      height={32}
    />
    <Div style={{ marginLeft: "10px" }}>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0288D1" }}>
        Мой ребенок
      </div>
      <div style={{ fontSize: "18px", color: "#0277BD" }}>О сервисе</div>
    </Div>
  </Div>
);

// Главный компонент
export const Home = ({ id }) => {
  const [activeTab, setActiveTab] = useState("recommendations");
  const [filters, setFilters] = useState({});
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [myCircles, setMyCircles] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const currentPlatform = platform();

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (eventId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(eventId)
        ? prevFavorites.filter((id) => id !== eventId)
        : [...prevFavorites, eventId]
    );
  };

  const addToMyCircles = (event) => {
    if (!myCircles.some((circle) => circle.id === event.id)) {
      setMyCircles([...myCircles, event]);
    }
  };

  const removeFromMyCircles = (eventId) => {
    setMyCircles((prevCircles) =>
      prevCircles.filter((circle) => circle.id !== eventId)
    );
  };

  const filteredEvents =
    activeTab === "favorites"
      ? events.leisure
          .concat(events.places, events.development)
          .filter((event) => favorites.includes(event.id))
      : events.leisure
          .concat(events.places, events.development)
          .filter((event) => {
            const matchesFilters = Object.entries(filters).some(
              ([key, value]) => value && event.category === key
            );
            return (
              matchesFilters || Object.values(filters).every((value) => !value)
            );
          });

  const toggleFilter = (filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: !prevFilters[filterKey],
    }));
  };

  return (
    <Panel id={id}>
      <ServiceInfo />
      <Tabs>
        <TabsItem
          onClick={() => setActiveTab("recommendations")}
          selected={activeTab === "recommendations"}
          style={{ fontSize: "18px", padding: "18px" }}
        >
          <div style={{ fontSize: "20px" }}>Рекомендации</div>
        </TabsItem>
        <TabsItem
          onClick={() => setActiveTab("favorites")}
          selected={activeTab === "favorites"}
          style={{ fontSize: "18px", padding: "18px" }}
        >
          <div style={{ fontSize: "20px" }}>Избранное</div>
        </TabsItem>
        <TabsItem
          onClick={() => setActiveTab("collections")}
          selected={activeTab === "collections"}
          style={{ fontSize: "18px", padding: "18px" }}
        >
          <div style={{ fontSize: "20px" }}>Подборки</div>
        </TabsItem>
        <TabsItem
          onClick={() => setActiveTab("myCircles")}
          selected={activeTab === "myCircles"}
          style={{ fontSize: "18px", padding: "18px" }}
        >
          <div style={{ fontSize: "20px" }}>Мои кружки</div>
        </TabsItem>
      </Tabs>

      {activeTab === "recommendations" && (
        <>
          <Div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              mode="primary"
              onClick={() => setShowFilterMenu((prev) => !prev)}
              style={{ margin: "10px 0" }}
              before={<Icon24Filter />}
            >
              Фильтр
            </Button>
          </Div>

          {showFilterMenu && (
            <Group header={<Header mode="secondary">Фильтры</Header>}>
              <Div>
                <Checkbox
                  onChange={() => toggleFilter("творчество")}
                  checked={!!filters["творчество"]}
                >
                  Творчество
                </Checkbox>
                <Checkbox
                  onChange={() => toggleFilter("история")}
                  checked={!!filters["история"]}
                >
                  История
                </Checkbox>
                <Checkbox
                  onChange={() => toggleFilter("культура")}
                  checked={!!filters["культура"]}
                >
                  Культура
                </Checkbox>
                <Checkbox
                  onChange={() => toggleFilter("образование")}
                  checked={!!filters["образование"]}
                >
                  Образование
                </Checkbox>
              </Div>
            </Group>
          )}

          <Group header={<Header mode="secondary">События</Header>}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <Card key={event.id} style={{ margin: "8px 0" }}>
                  <SimpleCell
                    before={
                      <Avatar
                        src={event.image}
                        style={{
                          width: "300px",
                          height: "200px",
                          borderRadius: "12px",
                        }}
                      />
                    }
                    description={event.date}
                    after={
                      <Button
                        mode="tertiary"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(event.id);
                        }}
                      >
                        {favorites.includes(event.id) ? (
                          <Icon28Favorite fill="light_blue" />
                        ) : (
                          <Icon28FavoriteOutline />
                        )}
                      </Button>
                    }
                  >
                    <div
                      style={{
                        fontSize: "24px",
                        fontStyle: "italic",
                        marginBottom: "10px",
                      }}
                    >
                      {event.title}
                    </div>

                    <Button
                      size="m"
                      onClick={() =>
                        myCircles.some((circle) => circle.id === event.id)
                          ? removeFromMyCircles(event.id)
                          : addToMyCircles(event)
                      }
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      {myCircles.some((circle) => circle.id === event.id)
                        ? "Вы записаны"
                        : "Записаться"}
                    </Button>
                  </SimpleCell>
                </Card>
              ))
            ) : (
              <Div>Нет событий, соответствующих фильтрам</Div>
            )}
          </Group>
        </>
      )}

      {activeTab === "myCircles" && (
        <Group header={<Header mode="secondary">Мои кружки</Header>}>
          {myCircles.length > 0 ? (
            myCircles.map((circle) => (
              <Card key={circle.id} style={{ margin: "8px 0" }}>
                <SimpleCell
                  before={
                    <Avatar
                      src={circle.image}
                      style={{
                        width: "300px",
                        height: "200px",
                        borderRadius: "12px",
                      }}
                    />
                  }
                  description={circle.date}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontStyle: "italic",
                      marginBottom: "10px",
                    }}
                  >
                    {circle.title}
                  </div>
                  <Button
                    size="m"
                    mode="destructive"
                    onClick={() => removeFromMyCircles(circle.id)}
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#FFCDD2",
                    }}
                  >
                    Удалить из моих кружков
                  </Button>
                </SimpleCell>
              </Card>
            ))
          ) : (
            <Div>У вас нет кружков.</Div>
          )}
        </Group>
      )}
    </Panel>
  );
};
