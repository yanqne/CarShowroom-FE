-- DB
CREATE DATABASE IF NOT EXISTS autoshowroom
  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE autoshowroom;

-- 1) Hãng xe
CREATE TABLE brands (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(140) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_brands_slug (slug)
) ENGINE=InnoDB;

-- 2) Dòng xe (model)
CREATE TABLE models (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  brand_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(160) NOT NULL,
  segment ENUM('Sedan','SUV','Hatchback','Crossover','Pickup','Coupe','MPV','Other') DEFAULT 'Other',
  slug VARCHAR(180) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_models_slug (slug),
  KEY idx_models_brand (brand_id),
  CONSTRAINT fk_models_brand FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3) Xe (phiên bản bán)
CREATE TABLE vehicles (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  model_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(200) NOT NULL,             -- VD: "Mercedes-Benz C300 AMG"
  variant VARCHAR(160),                    -- VD: "AMG Line"
  year SMALLINT UNSIGNED,
  drivetrain VARCHAR(60),                  -- AWD / RWD / FWD / 4x4
  transmission VARCHAR(60),                -- AT / MT / CVT ...
  engine VARCHAR(120),                     -- "2.0L Turbo"
  power_hp SMALLINT UNSIGNED,              -- 245
  torque_nm SMALLINT UNSIGNED,             -- 370
  fuel_consumption VARCHAR(40),            -- "7.2L/100km"
  seats TINYINT UNSIGNED,
  dimensions VARCHAR(120),                 -- "4750x1820x1440mm"
  trunk_l SMALLINT UNSIGNED,
  status ENUM('New','InStock','Coming','Discontinued') DEFAULT 'New',
  description TEXT,
  thumbnail_url VARCHAR(600),
  price_vnd BIGINT UNSIGNED,               -- Giá tham chiếu (liên hệ báo giá chi tiết)
  slug VARCHAR(200) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_vehicles_slug (slug),
  KEY idx_vehicles_model (model_id),
  KEY idx_vehicles_price (price_vnd),
  CONSTRAINT fk_vehicles_model FOREIGN KEY (model_id) REFERENCES models(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4) Ảnh xe (gallery)
CREATE TABLE vehicle_images (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  vehicle_id BIGINT UNSIGNED NOT NULL,
  url VARCHAR(700) NOT NULL,
  alt VARCHAR(200),
  sort_order INT UNSIGNED DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_vehicle_images_vehicle (vehicle_id, sort_order),
  CONSTRAINT fk_vehicle_images_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5) Màu sắc
CREATE TABLE colors (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,     -- "Đen", "Trắng", ...
  hex CHAR(7),                   -- "#000000"
  UNIQUE KEY uk_colors_name (name)
) ENGINE=InnoDB;

-- 6) Gán màu cho xe
CREATE TABLE vehicle_colors (
  vehicle_id BIGINT UNSIGNED NOT NULL,
  color_id BIGINT UNSIGNED NOT NULL,
  is_default TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (vehicle_id, color_id),
  KEY idx_vehicle_colors_default (vehicle_id, is_default),
  CONSTRAINT fk_vehicle_colors_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
  CONSTRAINT fk_vehicle_colors_color FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 7) Thông số (key-value)
CREATE TABLE vehicle_specs (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  vehicle_id BIGINT UNSIGNED NOT NULL,
  spec_key VARCHAR(120) NOT NULL,
  spec_value VARCHAR(400) NOT NULL,
  sort_order INT UNSIGNED DEFAULT 0,
  KEY idx_vehicle_specs_vehicle (vehicle_id, sort_order),
  CONSTRAINT fk_vehicle_specs_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8) Lead liên hệ
CREATE TABLE leads (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(140) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(160),
  message TEXT,
  vehicle_id BIGINT UNSIGNED DEFAULT NULL,
  source ENUM('Website','Facebook','Zalo','Phone','Other') DEFAULT 'Website',
  status ENUM('New','Contacted','Qualified','Won','Lost') DEFAULT 'New',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_leads_vehicle (vehicle_id, status, created_at),
  CONSTRAINT fk_leads_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 9) Lịch lái thử
CREATE TABLE test_drives (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  lead_id BIGINT UNSIGNED NOT NULL,
  vehicle_id BIGINT UNSIGNED NOT NULL,
  preferred_at DATETIME,
  status ENUM('Requested','Confirmed','Completed','Cancelled') DEFAULT 'Requested',
  note VARCHAR(300),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_test_drives_vehicle (vehicle_id, status, preferred_at),
  CONSTRAINT fk_test_drives_lead FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  CONSTRAINT fk_test_drives_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- BRANDS
INSERT INTO brands (id, name, slug, created_at) VALUES
  (1, 'Mercedes-Benz', 'mercedes-benz', NOW()),
  (2, 'BMW', 'bmw', NOW()),
  (3, 'Audi', 'audi', NOW()),
  (4, 'Toyota', 'toyota', NOW());

-- MODELS
INSERT INTO models (id, brand_id, name, segment, slug, created_at) VALUES
  (1, 1, 'C-Class', 'Sedan', 'c-class', NOW()),
  (2, 2, 'X5', 'SUV', 'x5', NOW()),
  (3, 3, 'A6', 'Sedan', 'a6', NOW()),
  (4, 4, 'Corolla Cross', 'Crossover', 'corolla-cross', NOW());

-- VEHICLES
INSERT INTO vehicles
(id, model_id, name, variant, year, drivetrain, transmission, engine, power_hp, torque_nm, fuel_consumption, seats, dimensions, trunk_l, status, description, thumbnail_url, price_vnd, slug, created_at)
VALUES
  (1, 1, 'Mercedes-Benz C300 AMG', 'AMG Line', 2025, 'RWD', 'AT', '2.0L Turbo', 258, 400, '7.2L/100km', 5, '4750x1820x1440mm', 480, 'InStock',
   'Sedan hạng sang với gói AMG, nhiều công nghệ an toàn.', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop', 1999000000, 'mercedes-benz-c300-amg', NOW()),
  (2, 2, 'BMW X5 xDrive40i', 'xDrive40i', 2025, 'AWD', 'AT', '3.0L Turbo', 340, 450, '9.8L/100km', 5, '4922x2004x1745mm', 650, 'InStock',
   'SUV sang trọng, động cơ I6 tăng áp mượt mà.', 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=800&auto=format&fit=crop', 4299000000, 'bmw-x5-xdrive40i', NOW()),
  (3, 3, 'Audi A6 45 TFSI', '45 TFSI', 2025, 'AWD', 'AT', '2.0L TFSI', 245, 370, '7.1L/100km', 5, '4939x1886x1457mm', 530, 'New',
   'Sedan doanh nhân, hệ dẫn động quattro.', 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop', 2499000000, 'audi-a6-45-tfsi', NOW()),
  (4, 4, 'Toyota Corolla Cross 1.8V', '1.8V', 2025, 'FWD', 'CVT', '1.8L NA', 140, 175, '6.5L/100km', 5, '4460x1825x1620mm', 440, 'InStock',
   'Crossover đô thị tiết kiệm, trang bị đủ dùng.', 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop', 910000000, 'toyota-corolla-cross-18v', NOW());

-- VEHICLE IMAGES
INSERT INTO vehicle_images (id, vehicle_id, url, alt, sort_order, created_at) VALUES
  (1, 1, 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1600&auto=format&fit=crop', 'C300 - góc trước', 1, NOW()),
  (2, 1, 'https://images.unsplash.com/photo-1549921296-3fdc4f104f3b?q=80&w=1600&auto=format&fit=crop', 'C300 - nội thất', 2, NOW()),
  (3, 2, 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop', 'X5 - góc trước', 1, NOW()),
  (4, 2, 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1600&auto=format&fit=crop', 'X5 - đuôi xe', 2, NOW()),
  (5, 3, 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1600&auto=format&fit=crop', 'A6 - góc trước', 1, NOW()),
  (6, 3, 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=1600&auto=format&fit=crop', 'A6 - nội thất', 2, NOW()),
  (7, 4, 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop', 'Corolla Cross - góc trước', 1, NOW()),
  (8, 4, 'https://images.unsplash.com/photo-1524602585632-44c0bcd41083?q=80&w=1600&auto=format&fit=crop', 'Corolla Cross - hông xe', 2, NOW());

-- COLORS
INSERT INTO colors (id, name, hex) VALUES
  (1, 'Đen', '#000000'),
  (2, 'Trắng', '#FFFFFF'),
  (3, 'Xám', '#777777'),
  (4, 'Đỏ', '#C1121F'),
  (5, 'Xanh', '#0D6EFD');

-- VEHICLE_COLORS
INSERT INTO vehicle_colors (vehicle_id, color_id, is_default) VALUES
  (1, 1, 1), (1, 2, 0), (1, 3, 0),
  (2, 3, 1), (2, 2, 0), (2, 5, 0),
  (3, 2, 1), (3, 1, 0), (3, 3, 0),
  (4, 2, 1), (4, 4, 0), (4, 5, 0);

-- VEHICLE_SPECS
INSERT INTO vehicle_specs (id, vehicle_id, spec_key, spec_value, sort_order) VALUES
  (1, 1, 'Động cơ', '2.0L Turbo', 1),
  (2, 1, 'Công suất', '258 hp', 2),
  (3, 1, 'Mô-men xoắn', '400 Nm', 3),
  (4, 1, 'Truyền động', 'RWD - AT', 4),
  (5, 2, 'Động cơ', '3.0L Turbo I6', 1),
  (6, 2, 'Công suất', '340 hp', 2),
  (7, 2, 'Dẫn động', 'AWD (xDrive)', 3),
  (8, 3, 'Động cơ', '2.0L TFSI', 1),
  (9, 3, 'Dẫn động', 'AWD (quattro)', 2),
  (10, 4, 'Hộp số', 'CVT', 1),
  (11, 4, 'Mức tiêu thụ', '6.5L/100km', 2);

-- LEADS (mẫu)
INSERT INTO leads (id, full_name, phone, email, message, vehicle_id, source, status, created_at) VALUES
  (1, 'Nguyễn Văn A', '0901234567', 'a.nguyen@example.com', 'Quan tâm C300 AMG, cần trả góp.', 1, 'Website', 'New', NOW()),
  (2, 'Trần Thị B', '0912345678', NULL, 'Xin báo giá X5 xDrive40i.', 2, 'Website', 'Contacted', NOW());

-- TEST_DRIVES (mẫu)
INSERT INTO test_drives (id, lead_id, vehicle_id, preferred_at, status, note, created_at) VALUES
  (1, 1, 1, DATE_ADD(NOW(), INTERVAL 3 DAY), 'Requested', 'Cuối tuần', NOW()),
  (2, 2, 2, DATE_ADD(NOW(), INTERVAL 5 DAY), 'Confirmed', 'Sáng 9h', NOW());
  select t.id, t.preferred_at, t.status, t.note, t.created_at, t.lead_id, t.vehicle_id from test_drives t;
  select * from Vehicles; 
  drop database autoshowroom;