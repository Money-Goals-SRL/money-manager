# Run the command "bash gitpush.sh" to execute the script

git add .

echo 'Enter the commit message:'
read commitMessage

git commit -m "$commitMessage"

# echo 'Enter the name of the branch:'
# read branch

git push origin main

npm run deploy

