% Auto-generated: do not edit by hand
\name{dashSeqaln}

\alias{dashSeqaln}

\title{DashSeqaln component}

\description{
ExampleComponent is an example component.
}

\usage{
dashSeqaln(id=NULL, alignment=NULL, excluded=NULL, included=NULL,
series=NULL, title=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{alignment}{Unnamed list. An iterable containing the sequences as objects with `id` and `seq` fields.}

\item{excluded}{Unnamed list. List of sequence IDs to NOT show in the alignment.}

\item{included}{Unnamed list. List of sequence IDs to show in the alignment.}

\item{series}{Named list. Object of numeric lists for the bar plots.}

\item{title}{Character. A label that will be printed when this component is rendered.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

