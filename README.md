# Vinternet Form Validation
An HTML form validation script which utilises HTML5 attributes and JavaScript to provide an accessible validation experience in real time for many common user input types. At present validation is only configured for 'missing input' and 'regex pattern matching' (which I felt were certainly the most common) with the intension of expanding support for the other HTML validity object properties (note that standard HTML constraint attributes like 'max-length' are also employed here).

## Requirements

* [NodeJS][nodejs] 6.0.0 and above
* [PugJS][pug] templating knowledge

## Setup & Usage

* To install, clone from GitHub and run `npm install` in the cloned directory
* Once install is complete, run `gulp local`
* Browse to http://localhost:5000 to view application in your chosen browser

## Configuration

You can configure the custom client side validation error messages by changing the `data-error` attribute of the HTML input to your desired string e.g. `data-error="Please enter a valid email address"`.

You can also configure the regex pattern matching validation rules to suit your needs by changing the necessary HTML input attribute and using the pug form mixins as a guide `templates/elements/_form.pug`.

## Browser Support

This application performs as expected across all evergreen browsers (Firefox, Chrome, Edge, Safari, etc) and will work correctly in versions of Internet Explorer 10 and above.

## Contributing
If you wish to submit a bug fix or feature, you can create a pull request and it will be merged pending a code review.

1. Fork the repository
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Commit your changes (`git commit -am 'Add some feature'`)
1. Push to the branch (`git push origin my-new-feature`)
1. Create a new Pull Request

[nodejs]: http://nodejs.org
[pug]: https://pugjs.org/
