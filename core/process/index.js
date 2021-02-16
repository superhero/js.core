class Process
{
  exit(...a)
  {
    process.exit(...a)
  }

  get report()
  {
    return process.report.getReport()
  }
}

module.exports = Process
