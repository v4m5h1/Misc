
CREATE VIEW MatchingRecords AS
SELECT * FROM migrationmaster
WHERE 
  SUBSTRING(sourceemail, 1, CHARINDEX('@', sourceemail) - 1) = 
    SUBSTRING(
      SUBSTRING(sourcesiteurl, CHARINDEX('personal/', sourcesiteurl) + 9, LEN(sourcesiteurl)),
      1,
      CHARINDEX('_', SUBSTRING(sourcesiteurl, CHARINDEX('personal/', sourcesiteurl) + 9, LEN(sourcesiteurl))) - 1
    )
  AND 
  REPLACE(SUBSTRING(targetemail, 1, CHARINDEX('@', targetemail) - 1), '.', '_') = 
    SUBSTRING(
      SUBSTRING(targetsiteurl, CHARINDEX('personal/', targetsiteurl) + 9, LEN(targetsiteurl)),
      1,
      CHARINDEX('_morganstanley', SUBSTRING(targetsiteurl, CHARINDEX('personal/', targetsiteurl) + 9, LEN(targetsiteurl))) - 1
    );






CREATE VIEW NonMatchingRecords AS
SELECT * FROM migrationmaster
WHERE 
  NOT (
    SUBSTRING(sourceemail, 1, CHARINDEX('@', sourceemail) - 1) = 
      SUBSTRING(
        SUBSTRING(sourcesiteurl, CHARINDEX('personal/', sourcesiteurl) + 9, LEN(sourcesiteurl)),
        1,
        CHARINDEX('_', SUBSTRING(sourcesiteurl, CHARINDEX('personal/', sourcesiteurl) + 9, LEN(sourcesiteurl))) - 1
      )
    AND 
    REPLACE(SUBSTRING(targetemail, 1, CHARINDEX('@', targetemail) - 1), '.', '_') = 
      SUBSTRING(
        SUBSTRING(targetsiteurl, CHARINDEX('personal/', targetsiteurl) + 9, LEN(targetsiteurl)),
        1,
        CHARINDEX('_morganstanley', SUBSTRING(targetsiteurl, CHARINDEX('personal/', targetsiteurl) + 9, LEN(targetsiteurl))) - 1
      )
  );
