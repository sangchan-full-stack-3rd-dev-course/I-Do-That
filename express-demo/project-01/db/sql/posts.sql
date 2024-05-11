CREATE table posts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    view INT NOT NULL DEFAULT 0,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);