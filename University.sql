/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.4001)
    Source Database Engine Edition : Microsoft SQL Server Enterprise Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2017
    Target Database Engine Edition : Microsoft SQL Server Standard Edition
    Target Database Engine Type : Standalone SQL Server
*/
USE [University]
GO
/****** Object:  Table [dbo].[University]    Script Date: 2017/10/7 9:13:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[University](
	[Name] [varchar](50) NULL,
	[Rank] [varchar](50) NULL,
	[Location] [varchar](50) NULL,
	[Tuition] [varchar](50) NULL,
	[Enrollment] [varchar](50) NULL,
	[Picture] [varchar](50) NULL,
	[Website] [varchar](50) NULL
) ON [PRIMARY]
GO
