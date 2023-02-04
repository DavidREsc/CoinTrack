CREATE DATABASE crypto_portfolio_tracker;
\c crypto_portfolio_tracker;

CREATE TABLE users(
    user_id SERIAL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT 'f',
    created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
    PRIMARY KEY (user_id)
);

CREATE TABLE portfolios(
    portfolio_id SERIAL,
    user_id INTEGER NOT NULL,
    portfolio_name VARCHAR(255) NOT NULL,
    main BOOLEAN NOT NULL DEFAULT 'f',
    created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
    PRIMARY KEY (portfolio_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TYPE TRANSACTION AS ENUM ('buy', 'sell');

CREATE TABLE transactions(
    transaction_id BIGSERIAL,
    transaction_type TRANSACTION NOT NULL,
    portfolio_id INTEGER NOT NULL,
    coin_id VARCHAR(255) NOT NULL,
    coin_amount DOUBLE PRECISION NOT NULL,
    coin_price INTEGER NOT NULL,
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