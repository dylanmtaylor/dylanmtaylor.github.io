echo "update image urls"
find . -type f -exec sed -i 's/http:\/\/dylanmtaylor.com\/wp-content\/uploads/\/images\/blog/g' {} +
find . -type f -exec sed -i 's/http:\/\/www.dylanmtaylor.com\/wp-content\/uploads/images\/blog/g' {} +
find . -type f -exec sed -i 's/http:\/\/dylantaylor.files.wordpress.com/images\/blog/g' {} +
echo "use relative urls"
find . -type f -exec sed -i 's/http:\/\/www.dylanmtaylor.com//g' {} +
echo "correct wordpress urls"
find . -type f -exec sed -i 's/wordpress_url:\ /wordpress_url:\ http:\/\/www.dylanmtaylor.com/g' {} +
