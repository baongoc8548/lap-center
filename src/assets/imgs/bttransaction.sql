CREATE DATABASE BANHANG;

CREATE TABLE Khach(
KhachID int primary key,
TenKhach nvarchar(50),
DiaChi nvarchar(50),
Email nvarchar(50))

CREATE TABLE HoaDon(
HoaDonID int primary key,
NgayBan datetime,
KhachID int,
foreign key (KhachID)references Khach(KhachID)
)

CREATE TABLE Hang(
HangID int primary key,
TenHang nvarchar(50),
DonVi float,
DonGia float
)

CREATE TABLE HangBan(
HangID int,
HoaDonID int,
SoLuong int,
foreign key (HangID) references Hang(HangID),
foreign key (HoaDonID) references HoaDon(HoaDonID)
)

/* 1. Viết giao dịch nhập thêm một mặt hàng mới vào CSDL*/
BEGIN TRAN
SET TRANSACTION ISOLATION
LEVEL READ UNCOMMITTED
SELECT *FROM Hang WHERE TenHang = 'Iphone 13'
ROLLBACK TRAN

BEGIN TRAN
INSERT INTO Hang VALUES(1, 'Iphone 13',5 ,5500)
WAITFOR DELAY '00:00:05'
COMMIT TRAN

SELECT * FROM Hang

/* 2. Viết giao dịch lập một hoá đơn mới cho khách hàng tên Minh*/
INSERT INTO Khach VALUES (1, 'Minh','DaNang','minh@gmail.com');

BEGIN TRAN
SET TRANSACTION ISOLATION
LEVEL READ UNCOMMITTED
SELECT *FROM HoaDon WHERE KhachID =1
ROLLBACK TRAN

BEGIN TRAN 
INSERT INTO HoaDon VALUES (1, getdate(),1)
WAITFOR DELAY '00:00:05'
COMMIT TRAN

SELECT *FROM HoaDon

/* 4. Viết giao dịch xoá khách hàng có mã số KH01 */
BEGIN TRAN
SET TRANSACTION ISOLATION
LEVEL READ UNCOMMITTED
SELECT *FROM Khach WHERE KhachID =1
ROLLBACK TRAN

BEGIN TRAN
DELETE FROM HoaDon WHERE HoaDon.KhachID =1
DELETE FROM Khach WHERE KhachID=1
WAITFOR DELAY '00:00:05'
COMMIT TRAN

SELECT *FROM HoaDon