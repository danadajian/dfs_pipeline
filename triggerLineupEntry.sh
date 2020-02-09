SPORT=$1
cd ../../Users/Dan/Documents/DFS-Pipeline || exit
node ./enterLineup.js "$SPORT"

# schtasks /create /tn "Enter Lineup" /tr "C:\Users\Dan\Documents\DFS-Pipeline\triggerLineupEntry.sh nba" /sc once /st 14:41
# schtasks /create /tn "Enter Lineup" /tr "C:\Users\Dan\Documents\DFS-Pipeline\triggerLineupEntry.sh nhl" /sc once /st 14:41