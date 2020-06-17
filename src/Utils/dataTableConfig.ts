export const dataTableConfig = {
    pagingType: 'full_numbers',
    pageLength: 5,
    dom: 'Bfrtip',
    // buttons: [
    //   'print',
    //   'csv'
    // ],
    responsive: true,
    /* below is the relevant part, e.g. translated to spanish */
    language: {

        processing: "chargement...",
        search: "Rechercher:",
        lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
        info: "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
        infoEmpty: "Information vide.",
        infoFiltered: "(filtré à partir de _MAX_ éléments au total)",
        infoPostFix: "",
        loadingRecords: "Chargement...",
        zeroRecords: "Aucune donnée à afficher",
        emptyTable: "Liste vide",
        paginate: {
            first: "Premier",
            previous: "Dernier",
            next: "Suivant",
            last: "Précédent"
        },
        aria: {
            sortAscending: ":  activer pour trier la colonne par ordre croissant",
            sortDescending: ": activer pour trier la colonne par ordre décroissant"
        }
    }
};