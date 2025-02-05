from pydantic import BaseModel, Field, AliasChoices, ConfigDict, field_validator, UUID4
from enum import Enum
import inspect
import uuid


class AccessToken(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    user_id: int = None


class PqTestTypes(Enum):
    """
    Class representing types of tests handled by PQToolkit.
    """

    AB: str = "AB"
    ABX: str = "ABX"
    APE: str = "APE"
    MUSHRA: str = "MUSHRA"


class PqTestBaseResult(BaseModel):
    uid: int | None = None

    test_number: int = Field(
        alias="testNumber", validation_alias=AliasChoices("testNumber", "test_number")
    )


class PqSelection(BaseModel):
    question_id: str = Field(
        alias="questionId", validation_alias=AliasChoices("questionId", "question_id")
    )
    sample_id: str = Field(
        alias="sampleId", validation_alias=AliasChoices("sampleId", "sample_id")
    )


class PqTestABResult(PqTestBaseResult):
    selections: list[PqSelection]


class PqTestABXResult(PqTestBaseResult):
    x_sample_id: str = Field(alias="xSampleId")
    x_selected: str = Field(alias="xSelected")
    selections: list[PqSelection] | list


class PqTestMUSHRAScore(BaseModel):
    sample_id: str = Field(alias="sampleId")
    score: int


class PqTestMUSHRAResult(PqTestBaseResult):
    reference_score: int = Field(alias="referenceScore")
    anchors_scores: list[PqTestMUSHRAScore] = Field(alias="anchorsScores")
    samples_scores: list[PqTestMUSHRAScore] = Field(alias="samplesScores")


class PqTestAPESampleRating(BaseModel):
    sample_id: str = Field(alias="sampleId")
    rating: int


class PqTestAPEAxisResult(BaseModel):
    axis_id: str = Field(alias="axisId")
    sample_ratings: list[PqTestAPESampleRating] = Field(alias="sampleRatings")


class PqTestAPEResult(PqTestBaseResult):
    axis_results: list[PqTestAPEAxisResult] = Field(alias="axisResults")


class PqResultsList(BaseModel):
    results: list[str]


class PqTestResultsList(BaseModel):
    results: list[
        PqTestABResult | PqTestABXResult | PqTestMUSHRAResult | PqTestAPEResult
    ]


class PqSample(BaseModel):
    """
    Class representing sound sample.

    Attributes:
        sample_id: An ID of the sample.
        asset_path: Path to the sample.
        rating: Rating of the sample.
    """

    sample_id: str = Field(
        alias="sampleId", validation_alias=AliasChoices("sampleId", "sample_id")
    )
    asset_path: str = Field(
        alias="assetPath", validation_alias=AliasChoices("assetPath", "asset_path")
    )
    rating: float | None = None


class PqQuestion(BaseModel):
    """
    Class representing test question.

    Attributes:
        question_id: An ID of the question.
        text: Text of the question.
    """

    question_id: str = Field(
        alias="questionId", validation_alias=AliasChoices("questionId", "question_id")
    )
    text: str


class PqTestBase(BaseModel):
    """
    Base class for the test.

    Attributes:
        test_number: A number of the test.
        type: A type of the test.
    """

    uid: int | None = None

    model_config = ConfigDict(use_enum_values=True, validate_default=True)

    test_number: int = Field(
        alias="testNumber", validation_alias=AliasChoices("testNumber", "test_number")
    )
    type: PqTestTypes
    results: (
        list[PqTestMUSHRAResult | PqTestAPEResult | PqTestABXResult | PqTestABResult]
        | None
    ) = None


class PqTestAB(PqTestBase):
    """
    Base class for the AB test.

    Attributes:
        test_number: A number of the test.
        type: A type of the test.
        samples: list of samples associated with the test
        questions: list of questions for the test
    """

    samples: list[PqSample]
    questions: list[PqQuestion]
    type: PqTestTypes = PqTestTypes.AB
    results: list[PqTestABResult] | None = None


class PqTestABX(PqTestBase):
    """
    Base class for the ABX test.

    Attributes:
        test_number: A number of the test.
        type: A type of the test.
        x_sample_id: Unknown sample id - the one to identify
        samples: list of samples associated with the test
        questions: list of questions for the test
    """

    x_sample_id: str | None = Field(
        None,
        alias="xSampleId",
        validation_alias=AliasChoices("xSampleId", "x_sample_id"),
    )
    samples: list[PqSample]
    questions: list[PqQuestion] | None = None
    type: PqTestTypes = PqTestTypes.ABX
    results: list[PqTestABXResult] | None = None


class PqTestMUSHRA(PqTestBase):
    """
    Base class for the MUSHRA test.

    Attributes:
        test_number: A number of the test.
        type: A type of the test.
        reference: A reference sample
        question: A question for the test
        anchors: list of anchor samples associated with the test
        samples: list of samples associated with the test
    """

    reference: PqSample
    question: str | None = None
    anchors: list[PqSample]
    samples: list[PqSample]
    type: PqTestTypes = PqTestTypes.MUSHRA
    results: list[PqTestMUSHRAResult] | None = None


class PqTestAPE(PqTestBase):
    """
    Base class for the APE test.

    Attributes:
        test_number: A number of the test.
        type: A type of the test.
        axis: A list of axis questions
        samples: list of samples associated with the test
    """

    axis: list[PqQuestion]
    samples: list[PqSample]
    type: PqTestTypes = PqTestTypes.APE
    results: list[PqTestAPEResult] | None = None


class PqExperiment(BaseModel):
    """
    Class representing experiments.

    Attributes:
        uid: A unique ID of the experiment.
        name: Experiment name.
        description: Experiment description.
        tests: A list of test objects
    """

    uid: UUID4 | str = uuid.uuid4()
    name: str
    description: str
    end_text: str | None = Field(alias="endText", default=None)
    tests: list[PqTestMUSHRA | PqTestAPE | PqTestABX | PqTestAB]

    @field_validator("tests", mode="before")  # noqa
    @classmethod
    def validate_tests(
        cls, v: list
    ) -> list[PqTestMUSHRA | PqTestAPE | PqTestABX | PqTestAB]:
        tests_list = []
        for test in v:
            object_type = type(test)
            if inspect.isclass(object_type) and issubclass(object_type, PqTestBase):
                tests_list.append(test)
            else:
                match PqTestTypes(test.get("type")):
                    case PqTestTypes.AB:
                        tests_list.append(PqTestAB(**test))
                    case PqTestTypes.ABX:
                        tests_list.append(PqTestABX(**test))
                    case PqTestTypes.APE:
                        tests_list.append(PqTestAPE(**test))
                    case PqTestTypes.MUSHRA:
                        tests_list.append(PqTestMUSHRA(**test))
        return tests_list


class PqExperimentsList(BaseModel):
    experiments: list[str]


class PqSuccessResponse(BaseModel):
    success: bool


class PqErrorResponse(BaseModel):
    message: str


class PqApiStatus(BaseModel):
    status: str = "HEALTHY"


class PqExperimentName(BaseModel):
    name: str

class PqSamplesRatings(BaseModel):
    filename: str
    average_rating: float