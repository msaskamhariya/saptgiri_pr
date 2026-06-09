-- Script to create the necessary tables for the Hospital PR Referral System
-- Compatible with SQL Server 2008 R2

-- 1. Create the PR_Agents Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[PR_Agents]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[PR_Agents] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Username] NVARCHAR(50) NOT NULL UNIQUE,
        [PasswordHash] NVARCHAR(255) NOT NULL, -- For demo purposes this is plaintext in initial seed
        [Name] NVARCHAR(100) NOT NULL,
        [Role] NVARCHAR(50) NOT NULL DEFAULT 'PR_AGENT',
        [IsActive] BIT NOT NULL DEFAULT 1,
        [CreatedAt] DATETIME NOT NULL DEFAULT GETDATE()
    );
END
GO

-- 2. Create the External_Referrals Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[External_Referrals]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[External_Referrals] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [ReferenceNumber] NVARCHAR(50) NOT NULL UNIQUE,
        [PatientName] NVARCHAR(100) NOT NULL,
        [Age] INT NULL,
        [Gender] NVARCHAR(10) NULL,
        [Phone] NVARCHAR(20) NOT NULL,
        [Department] NVARCHAR(50) NULL,
        [Priority] NVARCHAR(20) NOT NULL DEFAULT 'Normal',
        [Notes] NVARCHAR(MAX) NULL,
        [Status] NVARCHAR(20) NOT NULL DEFAULT 'Pending',
        [CreatedAt] DATETIME NOT NULL DEFAULT GETDATE(),
        [AgentId] INT NOT NULL,
        CONSTRAINT [FK_External_Referrals_PR_Agents] FOREIGN KEY ([AgentId]) REFERENCES [dbo].[PR_Agents] ([Id])
    );
END
GO

-- 3. Insert Initial Mock Data
-- Insert mock agent (password is plain 'saptgiri2024' for demonstration purposes as matching AuthController)
IF NOT EXISTS (SELECT * FROM [dbo].[PR_Agents] WHERE [Username] = 'agent01')
BEGIN
    INSERT INTO [dbo].[PR_Agents] ([Username], [PasswordHash], [Name], [Role], [IsActive])
    VALUES ('agent01', 'saptgiri2024', 'Agent 01', 'PR_AGENT', 1);
END

IF NOT EXISTS (SELECT * FROM [dbo].[PR_Agents] WHERE [Username] = 'prdesk')
BEGIN
    INSERT INTO [dbo].[PR_Agents] ([Username], [PasswordHash], [Name], [Role], [IsActive])
    VALUES ('prdesk', 'hospital@123', 'PR Desk', 'PR_AGENT', 1);
END
GO
