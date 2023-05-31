# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dashSeqaln <- function(id=NULL, alignment=NULL, excluded=NULL, included=NULL, series=NULL, title=NULL) {
    
    props <- list(id=id, alignment=alignment, excluded=excluded, included=included, series=series, title=title)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashSeqaln',
        namespace = 'dash_seqaln',
        propNames = c('id', 'alignment', 'excluded', 'included', 'series', 'title'),
        package = 'dashSeqaln'
        )

    structure(component, class = c('dash_component', 'list'))
}
