-- +migrate Up

CREATE TABLE IF NOT EXISTS Messages (
	MessageID CHAR(36) NOT NULL,
	SenderUsername CHAR(36) NOT NULL,
	ReceiverUsername CHAR(36) NOT NULL,
	GroupChatID CHAR(36) NOT NULL,
	Content TEXT NOT NULL,
	Types TEXT NOT NULL,
	SentAt TIMESTAMP NOT NULL,
	SeenAt TIMESTAMP,
	PRIMARY KEY (MessageID)
);

-- +migrate Down
DROP TABLE IF EXISTS Messages;