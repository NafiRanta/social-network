-- +migrate Up

CREATE TABLE IF NOT EXISTS Groups (
    GroupID CHAR(36) NOT NULL,
    GroupName TEXT NOT NULL,
    GroupDescription TEXT NOT NULL,
    Admin TEXT NOT NULL,
    AdminInvitedUsernames TEXT,
    MemberInvitedUsernames TEXT,
    RequestUsernames TEXT,
    MemberUsernames TEXT,
    PostIDs TEXT,
    EventIDs TEXT,
    CreateAt TIMESTAMP NOT NULL,
    PRIMARY KEY (GroupID)
);

-- +migrate Down
DROP TABLE IF EXISTS Groups;