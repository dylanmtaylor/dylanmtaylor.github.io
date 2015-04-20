find . -type f -exec sed -i 's/http:\/\/dylanmtaylor.com\/wp-content\/uploads/\/images\/blog/g' {} +
find . -type f -exec sed -i 's/http:\/\/www.dylanmtaylor.com\/wp-content\/uploads/images\/blog/g' {} +
find . -type f -exec sed -i 's///g' {} +
