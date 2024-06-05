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
  (term_var) @type
)

(term_forall
  (_)
  (term_var) @variable.parameter
)

(term_apply
  (term_var) @function.call
  (_)
)

(term_bind
  (term_annot
    (term_var) @variable
    (_)
  )?
)
