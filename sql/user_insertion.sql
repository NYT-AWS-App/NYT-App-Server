--
-- Insert some users to start with:
-- 
-- PWD hashing: https://phppasswordhash.com/
--
INSERT INTO users(username, pwdhash, bucketfolder)  -- pwd = abc123!!
            values('g_minster', 
                   '$2y$10$/8B5evVyaHF.hxVx0i6dUe2JpW89EZno/VISnsiD1xSh6ZQsNMtXK',
                   '60e0339d-2382-4df1-87b1-4510b2172728');

INSERT INTO users(username, pwdhash, bucketfolder)  -- pwd = abc456!!
            values('p_hoey',
                   '$2y$10$F.FBSF4zlas/RpHAxqsuF.YbryKNr53AcKBR3CbP2KsgZyMxOI2z2',
                   '241bf31b-eae9-4e6c-a578-10761d4d09bb');

INSERT INTO users(username, pwdhash, bucketfolder)  -- pwd = abc789!!
            values('m_bosnich', 
                   '$2y$10$GmIzRsGKP7bd9MqH.mErmuKvZQ013kPfkKbeUAHxar5bn1vu9.sdK',
                   '05f6dcf5-d53e-4042-a7b8-b13ba43bb0c2');

INSERT INTO users(username, pwdhash, bucketfolder)  -- pwd = abc1000!!
            values('w_hoffman', 
                   '$2y$10$NeCKoZV3pHTK4a8wX8Icp.I2M5.lbOsvOupjQpLS.d5Eufhwg3wgi',
                   '827d5fff-9ded-4250-a5c9-04d15b933f8b');

