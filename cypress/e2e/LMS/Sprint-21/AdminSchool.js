const adminDashboardPage = require('../../../support/pageObjects/LMS-2/AdminDashboardPage')
const quickLinksPage = require('../../../support/pageObjects/LMS-2/QuickLinksPage')

describe("Verify admin school functionalities", function () {

    before(function () {
        cy.visit(Cypress.env('urlQAPreSetup'))
        cy.fixture('LMS/AdminLoginCredentials').then(function (validAdminLoginData) {
            cy.AdminPostSetup(validAdminLoginData.fNew, validAdminLoginData.password)
        })
    })
    it('EL-6151/ES6151_1 /Validate user is able to view the "Edit" icon in the “Action” column in the School Notice Board/ Private Notice Board screen.', function () {
        adminDashboardPage.getSchoolBtn().click({ force: true })
        quickLinksPage.getAddNoticeBtn().click()
        quickLinksPage.getCreateNewNoticeTitle().type('Test automation')
        quickLinksPage.getCreateNewNoticeTypeDropdown().click()
        quickLinksPage.getCreateNewNoticeTypeGeneralOpt().click()
        quickLinksPage.getCreateNewNoticeDescriptionTextareafield().type('Automation testdata')
        quickLinksPage.getCreateNewNoticePublishRightNowRedioBtn().check()
        quickLinksPage.getCreateNewNoticeEntireSchoolRedioBtn().check()
        quickLinksPage.getCreateNewNoticeSendBtn().click()
        quickLinksPage.getEditBtn().should('be.visible')
    })
    it('EL-6151/ES6151_2 Validate user click on "Edit" option "Save & Send" button, "Cancel" button and "X" icon is displayed', function () {
        cy.wait(20000)
        quickLinksPage.getEditBtn().click()
        cy.wait(2000)
        quickLinksPage.getCreateNewNoticeSaveAndSendBtn().scrollIntoView().should('be.visible')
        quickLinksPage.getCreateNewNoticeCancelBtn().scrollIntoView().should('be.visible')
        quickLinksPage.getCreateNewNoticeXBtn().should('be.visible')
    })
    it('EL-6151/ES6151_3  Validate "Notice Title" attribute with text field, "Notice Type" attribute with Drop Down Arrow and "Description" attribute is present with text box', function () {
        quickLinksPage.getCreateNewNoticeTitle().scrollIntoView().should('be.visible')
        quickLinksPage.getCreateNewNoticeTypeDropdown().should('be.visible')
        quickLinksPage.getCreateNewNoticeDescriptionTextareafield().should('be.visible')
    })
    it('EL-6151/ES6151_4 Validate "Description" text box is accepting Alphabet,Numbers and Special Characters', function () {
        quickLinksPage.getCreateNewNoticeDescriptionTextareafield().scrollIntoView().clear().type('asdfghjjj12345!@#$%^&')
    })
    it('EL-6151/ES6151_5 Validate "Notice Title" text field is accepting Alphabet,Numbers and Special Characters', function () {
        quickLinksPage.getCreateNewNoticeTitle().scrollIntoView().clear().type('zxcvbnm,1234567890!@#$%^&*(+_)(*&^')
    })
    it('EL-6151/ES6151_6 Validate when clicked on drop down next to "Notice Type" is displaying Tags', function () {
        quickLinksPage.getCreateNewNoticeTypeDropdown().click()
        quickLinksPage.getCreateNewNoticeTypeGeneralOpt().should('be.visible')
        quickLinksPage.getCreateNewNoticeTypeImportantOpt().should('be.visible')
        quickLinksPage.getCreateNewNoticeTypeOthersOpt().should('be.visible')
        quickLinksPage.getCreateNewNoticeTypeGeneralOpt().click()
    })
    it('EL-6151/ES6151_7 Validate Radio button is present for Attribute "Publish Right now" and "Publish later on"', function () {
        cy.wait(2000)
        quickLinksPage.getCreateNewNoticePublishRightNowRedioBtn().should('be.enabled')
        quickLinksPage.getCreateNewNoticePublishLaterOnRedioBtn().should('be.enabled')
    })
    it('EL-6151/ES6151_8 Validate user is not able to select two radio buttons at a time', function () {
        quickLinksPage.getCreateNewNoticePublishRightNowRedioBtn().check().should('be.checked')
        quickLinksPage.getCreateNewNoticePublishLaterOnRedioBtn().should('not.be.checked')
    })
    it('EL-6151/ES6151_9 Validate when the Radio button for "Publish later on" attribute is selected calendar icon is displayed', function () {
        quickLinksPage.getCreateNewNoticePublishLaterOnRedioBtn().check()
        cy.wait(2000)
        quickLinksPage.getCreateNewNoticeCalenderIcon().should('be.visible')
    })
    it('EL-6151/ES6151_10 Validate the Radio button for "Publish Right now" attribute is selected no calendar icon is displayed', function () {
        quickLinksPage.getCreateNewNoticePublishRightNowRedioBtn().check()
        quickLinksPage.getCreateNewNoticeCalenderIcon().should('not.be.enabled')
    })
    it('EL-6151/ES6151_11 Validate Radio button is present for Attribute "Entire School " and "Specific Members"', function () {
        quickLinksPage.getCreateNewNoticeEntireSchoolRedioBtn().should('be.enabled')
        quickLinksPage.getCreateNewNoticeSpecificMembersRedioBtn().should('be.enabled')
    })
    it('EL-6151/ES6151_12 Validate when the Radio button for "Specific Members" attribute is selected "+Add Member" button is enabled.', function () {
        quickLinksPage.getCreateNewNoticeSpecificMembersRedioBtn().check()
        quickLinksPage.getCreateNewNoticeAddMembersBtn().should('be.enabled')
    })
    it('EL-6151/ES6151_13 Validate user click on "+Add Member" button, list of members are displayed', function () {
        quickLinksPage.getCreateNewNoticeAddMembersBtn().click()
        quickLinksPage.getCreateNewNoticeTeacherTab().click()
        quickLinksPage.getCreateNewNoticemembersList().should('be.visible')
        quickLinksPage.getCreateNewNoticeSaveBtn().click()
    })
    it('EL-6151/ES6151_14 Validate the Radio button for "Entire School" attribute is selected "+Add Member" button is disabled.', function () {
        quickLinksPage.getCreateNewNoticeEntireSchoolRedioBtn().check()
        quickLinksPage.getCreateNewNoticeAddMembersBtn().should('not.be.enabled')
    })
    it('EL-6151/ES6151_15 Validate the Radio button for "Entire School" attribute is selected and when user click on "Save & Send", all school members of the notice are notified of the update', function () {
        quickLinksPage.getCreateNewNoticeSaveAndSendBtn().click()
        quickLinksPage.getCreateNewNoticeSchoolNoticeBoardBtn().click()
    })
    it('EL-6151/ES6151_17 Validate user click on "Save & Send", the notice details is displayed on the School notice board/ Private Notice Board for the user/ attendees.', function () {
        quickLinksPage.getEditBtn().click()
        quickLinksPage.getCreateNewNoticePublishLaterOnRedioBtn().check()
        quickLinksPage.getCreateNewNoticeCalenderIcon().click()
        quickLinksPage.getCreateNewNoticeRightArrowBtn().click()
        quickLinksPage.getCreateNewNoticeDateBtn().click()
        quickLinksPage.getCreateNewNoticeSpecificMembersRedioBtn().check()
        quickLinksPage.getCreateNewNoticeAddMembersBtn().click()
        quickLinksPage.getCreateNewNoticeTeacherTab().click()
        quickLinksPage.getCreateNewNoticeAddBtn().click()
        quickLinksPage.getCreateNewNoticeSaveBtn().click()
        quickLinksPage.getCreateNewNoticeSaveAndSendBtn().click()
    })
    it('EL-6151/ES6151_18 Validate user click on "Save & Send", a successful pop-up is displayed saying “Notice published successfully” and, the user is redirected to the School notice board.', function () {
        cy.contains("Notice Published Successfully").should('be.visible')
        cy.wait(4000)
    })
    it('EL-6151/ES6151_19 Validate user clicks on "Cancel" button no changes are saved and the user is re-directed to the School notice board.', function () {
        quickLinksPage.getEditBtn().click()
        quickLinksPage.getCreateNewNoticeCancelBtn().click()
        quickLinksPage.getCreateNewNoticeSchoolNoticeBoardBtn().should('be.visible')
    })
    it('EL-6151/ES6151_20 Validate user clicks on X, user is re-directed to the School Notice Board..', function () {
        cy.wait(2000)
        quickLinksPage.getEditBtn().click()
        quickLinksPage.getCreateNewNoticeXBtn().click()
        quickLinksPage.getCreateNewNoticeSchoolNoticeBoardBtn().should('be.visible')
    })
    it('EL-6152/ES6152_1 Validate user is able to view the "Delete" icon in the “Action” column in the School Notice Board/ Private Notice Board screen.', function () {
        quickLinksPage.getDeleteBtn().should('be.visible')
    })
    it('EL-6152/ES6152_3 Validate user clicks on delete, a confirmation pop-up is displayed stating “Are you sure you want to delete the notice?”', function () {
        cy.contains('Are you sure you want to delete the notice').should('be.visible')
    })
    it('EL-6152/ES6152_4 Validate the user clicks on "Delete Notice" button ,notice is removed from the School Notice Board/ Private Notice Board screen for the user/ attendees', function () {
        cy.get('Test automation').should('not.be.visible')
    })
    it('EL-6152/ES6152_5 Validate the user clicks on "Cancel" button user is re-directed to the School Notice Board/ Private Notice Board screen.', function () {
        quickLinksPage.getAddNoticeBtn().click()
        quickLinksPage.getCreateNewNoticeTitle().type('Test automation')
        quickLinksPage.getCreateNewNoticeTypeDropdown().click()
        quickLinksPage.getCreateNewNoticeTypeGeneralOpt().click()
        quickLinksPage.getCreateNewNoticeDescriptionTextareafield().type('Automation testdata')
        quickLinksPage.getCreateNewNoticePublishRightNowRedioBtn().check()
        quickLinksPage.getCreateNewNoticeEntireSchoolRedioBtn().check()
        quickLinksPage.getCreateNewNoticeSendBtn().click()
        quickLinksPage.getCreateNewNoticeSchoolNoticeBoardBtn().click()
        quickLinksPage.getDeleteBtn()
        quickLinksPage.getCreateNewNoticeDeletePopupCancelBtn().click()
        quickLinksPage.getCreateNewNoticeSchoolNoticeBoardBtn().should('be.visible')
    })
    it('EL-6152/ES6152_6 Validate the user clicks on "X" icon user is re-directed to the School Notice Board/ Private Notice Board screen.', function () {
        quickLinksPage.getAddNoticeBtn().click()
        quickLinksPage.getCreateNewNoticeTitle().type('Test automation')
        quickLinksPage.getCreateNewNoticeTypeDropdown().click()
        quickLinksPage.getCreateNewNoticeTypeGeneralOpt().click()
        quickLinksPage.getCreateNewNoticeDescriptionTextareafield().type('Automation testdata')
        quickLinksPage.getCreateNewNoticePublishRightNowRedioBtn().check()
        quickLinksPage.getCreateNewNoticeEntireSchoolRedioBtn().check()
        quickLinksPage.getCreateNewNoticeSendBtn().click()
        quickLinksPage.getCreateNewNoticeSchoolNoticeBoardBtn().click()
        quickLinksPage.getDeleteBtn()
        quickLinksPage.getCreateNewNoticeDeletePopupXBtn().click()
        quickLinksPage.getCreateNewNoticeSchoolNoticeBoardBtn().should('be.visible')
    })

})