-- +migrate Up 

CREATE TABLE IF NOT EXISTS GroupEvents (
    GroupEventID CHAR(36) NOT NULL,
    GroupID CHAR(36) NOT NULL,
    UserName CHAR(36) NOT NULL,
    EventName TEXT NOT NULL,
    EventDescription TEXT NOT NULL,
    EventDate TEXT NOT NULL,
    EventTime TEXT NOT NULL,
    notGoingUsers TEXT,
    GoingUsers TEXT,
    CreateAt TIMESTAMP NOT NULL,
    PRIMARY KEY (GroupEventID)
);

-- +migrate Down
DROP TABLE IF EXISTS GroupEvents;