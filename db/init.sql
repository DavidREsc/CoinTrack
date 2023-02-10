CREATE DATABASE crypto_portfolio_tracker;
\c crypto_portfolio_tracker;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT 'f',
    created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
    PRIMARY KEY (user_id)
);

CREATE TABLE portfolios(
    portfolio_id SERIAL,
    user_id UUID NOT NULL,
    portfolio_name VARCHAR(33) NOT NULL,
    main BOOLEAN NOT NULL DEFAULT 'f',
    created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
    PRIMARY KEY (portfolio_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TYPE TRANSACTION AS ENUM ('buy', 'sell');

CREATE TABLE transactions(
    transaction_id SERIAL,
    transaction_type TRANSACTION NOT NULL,
    transaction_date TIMESTAMPTZ NOT NULL,
    portfolio_id INTEGER NOT NULL,
    coin_id VARCHAR NOT NULL,
    coin_amount VARCHAR NOT NULL,
    coin_price VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
    PRIMARY KEY (transaction_id),
    FOREIGN KEY (portfolio_id) REFERENCES portfolios(portfolio_id)
);

CREATE TABLE jwt_blacklist (
    jwt_id BIGSERIAL,
    jwt VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT (now())
);

CREATE INDEX transactions_index ON transactions(portfolio_id);