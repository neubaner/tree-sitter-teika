[
  ";"
  ","
] @punctuation.delimiter

[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket

[
  "->"
  "=>"
  "="
  "%"
  "&"
] @operator

(term_string) @string
(term_number) @number

(term_annot
  (term_var) @variable.parameter
  (_)+ @type
)
